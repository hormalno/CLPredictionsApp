from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from predictions.models import MatchPrediction, ScorePrediction
from predictions.serializers import MatchPredictionResultSerializer, UserMatchPredictionSerializer, UserScorePredictionSerializer, SubmitPredictionSerializer
from predictions.signals import get_outcome


class UserPredictionsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        match_predictions = (
            MatchPrediction.objects
            .filter(user=request.user)
            .select_related('match')
            .order_by('-points', 'match__date')
        )
        return Response({
            'match_predictions': UserMatchPredictionSerializer(match_predictions, many=True).data
        })


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


# class MatchPredictionListView(generics.ListAPIView):
#     serializer_class = MatchPredictionResultSerializer
#     permission_classes = [IsAuthenticatedOrReadOnly]

#     def get_queryset(self):
#         match_id = self.kwargs['match_id']
#         return (
#             MatchPrediction.objects
#             .filter(match_id=match_id)
#             .select_related('user')
#             .order_by('-points', 'user__username')
#         )
