from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from predictions.models import MatchPrediction, ScorePrediction


class ClosePredictionsView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        mp_count = MatchPrediction.objects.filter(is_closed=False).update(is_closed=True)
        sp_count = ScorePrediction.objects.filter(is_closed=False).update(is_closed=True)
        return Response({'match_predictions_closed': mp_count, 'score_predictions_closed': sp_count})
