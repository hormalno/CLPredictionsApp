from django.db.models import Window
from django.db.models.functions import DenseRank
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import RankSnapshot, User
from .serializers import LeaderboardSerializer, RegisterSerializer, UserSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)


class MeView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user


class LeaderboardView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        users = list(
            User.objects.filter(is_superuser=False, is_staff=False)
            .annotate(rank=Window(expression=DenseRank(), order_by='-points'))
            .order_by('-points', 'username')
        )

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
