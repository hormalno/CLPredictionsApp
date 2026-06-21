from django.db.models import (
    Case,
    Count,
    IntegerField,
    OuterRef,
    Q,
    Subquery,
    Sum,
    When,
)
from django.db.models.functions import Coalesce
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from predictions.models import KnockoutPrediction

from .models import RankSnapshot, User
from .serializers import (
    ChangePasswordSerializer,
    LeaderboardSerializer,
    RegisterSerializer,
    UserSerializer,
)

# Knockout rounds, ordered from earliest to latest. Each becomes its own
# leaderboard column counting the correct predicted teams in that round.
KNOCKOUT_ROUNDS = ('R32', 'R16', 'QF', 'SF', '3P', 'F')


def knockout_correct_subquery(round_code=None):
    """Per-user count of correct predicted teams (home + away).

    Scoped to a single round when ``round_code`` is given, otherwise summed
    across all knockout rounds (used as the top leaderboard tie-breaker).

    Done as a Subquery rather than an annotate Count so it doesn't join the
    knockoutprediction relation alongside the matchprediction counts below —
    mixing two multi-valued relations in one query inflates both via fan-out.
    """
    qs = KnockoutPrediction.objects.filter(user=OuterRef('pk'))
    if round_code is not None:
        qs = qs.filter(match__round=round_code)
    return Coalesce(
        Subquery(
            qs.values('user')
            .annotate(
                correct=Sum(
                    Case(When(home_team_correct=True, then=1), default=0, output_field=IntegerField())
                    + Case(When(away_team_correct=True, then=1), default=0, output_field=IntegerField())
                )
            )
            .values('correct')
        ),
        0,
    )


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)


class MeView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user


class ChangePasswordView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = ChangePasswordSerializer(
            data=request.data, context={'request': request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'detail': 'Password updated successfully.'})


class LeaderboardView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        knockout_annotations = {
            f'knockout_{round_code}_correct': knockout_correct_subquery(round_code)
            for round_code in KNOCKOUT_ROUNDS
        }
        knockout_annotations['knockout_total_correct'] = knockout_correct_subquery()
        users = list(
            User.objects.filter(is_superuser=False, is_staff=False)
            .annotate(
                outcome_count=Count(
                    'matchprediction',
                    filter=Q(matchprediction__correct_outcome=True),
                ),
                exact_count=Count(
                    'matchprediction',
                    filter=Q(
                        matchprediction__correct_home_team_score=True,
                        matchprediction__correct_away_team_score=True,
                    ),
                ),
                single_score_count=Count(
                    'matchprediction',
                    filter=(
                        Q(
                            matchprediction__correct_home_team_score=True,
                            matchprediction__correct_away_team_score=False,
                        )
                        | Q(
                            matchprediction__correct_home_team_score=False,
                            matchprediction__correct_away_team_score=True,
                        )
                    ),
                ),
            )
            .annotate(**knockout_annotations)
            .order_by(
                '-points',
                '-knockout_total_correct',  # knockout outcomes
                '-outcome_count',           # group stage outcomes
                '-exact_count',             # exact scores
                '-single_score_count',      # one correct score
                'username',
            )
        )

        # Strict, unique ranks (1, 2, 3, …) — ties are broken by the order_by above.
        for position, user in enumerate(users, start=1):
            user.rank = position

        user_ids = [u.pk for u in users]
        prev_ranks: dict[int, int] = {}
        try:
            for snap in RankSnapshot.objects.filter(user_id__in=user_ids).order_by('-taken_at'):
                if snap.user_id not in prev_ranks:
                    prev_ranks[snap.user_id] = snap.rank
                if len(prev_ranks) == len(user_ids):
                    break
        except Exception:
            pass

        for user in users:
            user.prev_rank = prev_ranks.get(user.pk)

        serializer = LeaderboardSerializer(users, many=True)
        return Response(serializer.data)
