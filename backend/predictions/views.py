from rest_framework import generics
from rest_framework.permissions import IsAdminUser, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.views import APIView
from predictions.models import KnockoutPrediction, MatchPrediction
from predictions.serializers import (
    MatchesUserScoreSerializer,
    MatchPredictionSerializer,
    SubmitKnockoutPredictionSerializer,
    SubmitPredictionSerializer,
    UserKnockoutPredictionSerializer,
    UserMatchPredictionSerializer,
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
        qs = MatchPrediction.objects.filter(match__is_finished=True)

        limit = request.query_params.get('limit')
        if limit:
            from matches.models import Match
            recent_match_ids = (
                Match.objects
                .filter(is_finished=True)
                .order_by('-date')
                .values_list('id', flat=True)[:int(limit)]
            )
            qs = qs.filter(match__in=recent_match_ids)

        scores = qs.select_related('user').order_by('match', '-points', 'user__username')
        return Response(MatchesUserScoreSerializer(scores, many=True).data)
    
class PredictionsPerMatchListView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, match_id):
        predictions = MatchPrediction.objects.filter(match__id=match_id, match__is_closed=True).select_related('user', 'match')
        return Response(MatchPredictionSerializer(predictions, many=True).data)


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

        KnockoutPrediction.objects.update_or_create(
            match=match,
            user=request.user,
            defaults=defaults,
        )

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
        return Response(UserKnockoutPredictionSerializer(predictions, many=True).data)

