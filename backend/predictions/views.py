from django.core.exceptions import ValidationError as DjangoValidationError

from rest_framework import generics
from rest_framework.exceptions import ValidationError as DRFValidationError
from rest_framework.permissions import IsAdminUser, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from predictions.models import KnockoutPrediction, MatchPrediction, TopScorerPrediction
from predictions.serializers import (
    KnockoutPredictionPerMatchSerializer,
    KnockoutUserScoreSerializer,
    MatchesUserScoreSerializer,
    MatchPredictionSerializer,
    SubmitKnockoutPredictionSerializer,
    SubmitPredictionSerializer,
    SubmitTopScorerPredictionSerializer,
    UserKnockoutPredictionSerializer,
    UserMatchPredictionSerializer,
    UserTopScorerPredictionSerializer,
)


class UserPredictionsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        match_predictions = (
            MatchPrediction.objects
            .filter(user=request.user)
            .select_related('match')
            .order_by('-points', 'match__date')
        )
        return Response(UserMatchPredictionSerializer(match_predictions, many=True).data)


class SubmitPredictionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = SubmitPredictionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        match = serializer.validated_data['match']
        home_score = serializer.validated_data['home_team_score']
        away_score = serializer.validated_data['away_team_score']

        MatchPrediction.objects.update_or_create(
            match=match, user=request.user,
            defaults={'home_team_score': home_score, 'away_team_score': away_score},
        )

        return Response({'status': 'saved'}, status=201)


class MatchesUserScoresView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        from matches.models import Match

        mp_qs = MatchPrediction.objects.filter(match__is_finished=True)
        kp_qs = KnockoutPrediction.objects.filter(match__is_finished=True)

        limit = request.query_params.get('limit')
        if limit:
            recent_match_ids = (
                Match.objects
                .filter(is_finished=True)
                .order_by('-date')
                .values_list('id', flat=True)[:int(limit)]
            )
            mp_qs = mp_qs.filter(match__in=recent_match_ids)
            kp_qs = kp_qs.filter(match__in=recent_match_ids)

        mp_data = MatchesUserScoreSerializer(mp_qs.select_related('user'), many=True).data
        kp_data = KnockoutUserScoreSerializer(kp_qs.select_related('user'), many=True).data

        combined = sorted(
            list(mp_data) + list(kp_data),
            key=lambda x: (x['match'], -x['points'], x['username']),
        )
        return Response(combined)
    
class PredictionsPerMatchListView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, match_id):
        predictions = MatchPrediction.objects.filter(match__id=match_id, match__is_closed=True).select_related('user', 'match')
        return Response(MatchPredictionSerializer(predictions, many=True).data)


class KnockoutPredictionsPerMatchListView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, match_id):
        predictions = (
            KnockoutPrediction.objects
            .filter(match__id=match_id, match__is_closed=True)
            .select_related('user', 'match', 'predicted_home_team', 'predicted_away_team', 'predicted_winner')
        )
        return Response(KnockoutPredictionPerMatchSerializer(predictions, many=True, context={'request': request}).data)


class SubmitKnockoutPredictionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = SubmitKnockoutPredictionSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data
        match = data['match']

        defaults = {}
        for field in ('predicted_home_team', 'predicted_away_team', 'predicted_winner', 'home_team_score', 'away_team_score'):
            if field in data:
                defaults[field] = data[field]

        try:
            KnockoutPrediction.objects.update_or_create(
                match=match,
                user=request.user,
                defaults=defaults,
            )
        except DjangoValidationError as exc:
            raise DRFValidationError(exc.message_dict if hasattr(exc, 'message_dict') else exc.messages)

        return Response({'status': 'saved'}, status=201)


class UserKnockoutPredictionsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        predictions = (
            KnockoutPrediction.objects
            .filter(user=request.user)
            .select_related('match', 'predicted_home_team', 'predicted_away_team', 'predicted_winner')
            .order_by('match__date')
        )
        return Response(UserKnockoutPredictionSerializer(predictions, many=True, context={'request': request}).data)


class SubmitTopScorerPredictionView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        from matches.models import Match
        if Match.objects.filter(round='GS', is_finished=True).exists():
            return Response({'detail': 'Top scorer predictions are locked once the tournament has started.'}, status=403)

        serializer = SubmitTopScorerPredictionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        player = serializer.validated_data['player']
        TopScorerPrediction.objects.update_or_create(
            user=request.user,
            defaults={'player': player},
        )
        return Response({'status': 'saved'}, status=201)


class UserTopScorerPredictionView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        from matches.models import Match
        locked = Match.objects.filter(round='GS', is_finished=True).exists()
        try:
            prediction = TopScorerPrediction.objects.select_related('player').get(user=request.user)
            data = UserTopScorerPredictionSerializer(prediction).data
        except TopScorerPrediction.DoesNotExist:
            data = None
        return Response({'prediction': data, 'tournament_locked': locked})

