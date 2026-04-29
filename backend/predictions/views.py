from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from predictions.models import MatchPrediction
from predictions.serializers import UserMatchPredictionSerializer, SubmitPredictionSerializer, MatchUserScoreSerializer


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


class MatchUserScoresView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request):
        scores = (
            MatchPrediction.objects
            .filter(match__is_finished=True)
            .select_related('user')
            .order_by('match', '-points', 'user__username')
        )
        return Response(MatchUserScoreSerializer(scores, many=True).data)
