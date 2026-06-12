"""
URL configuration for app project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve
from django.urls import re_path
from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from matches.views import MatchViewSet
from groups.views import GroupViewSet
from players.views import PlayerViewSet, TopGoalScorersView
from teams.views import TeamListView, TopTeamGoalStatsView
from predictions.views import (
    KnockoutPredictionsPerMatchListView,
    MatchesUserScoresView,
    PredictionsPerMatchListView,
    SubmitGroupPredictionView,
    SubmitKnockoutPredictionView,
    SubmitPredictionView,
    SubmitTopScorerPredictionView,
    SubmitTopTeamPredictionView,
    UserGroupPredictionsView,
    UserKnockoutPredictionsView,
    UserPredictionsView,
    UserTopScorerPredictionView,
    UserTopTeamPredictionView,
)

router = DefaultRouter()
router.register(r'matches', MatchViewSet, basename='match')
router.register(r'groups', GroupViewSet, basename='group')
router.register(r'players', PlayerViewSet, basename='player')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/', include('accounts.urls')),
    path('api/players/top-scorers/', TopGoalScorersView.as_view(), name='top_goal_scorers'),
    path('api/', include(router.urls)),
    path('api/matches-scores/', MatchesUserScoresView.as_view(), name='matches_scores'),
    path('api/matches/<int:match_id>/predictions/', PredictionsPerMatchListView.as_view(), name='match_predictions'),
    path('api/matches/<int:match_id>/knockout-predictions/', KnockoutPredictionsPerMatchListView.as_view(), name='match_knockout_predictions'),
    path('api/predictions/submit/', SubmitPredictionView.as_view(), name='submit_prediction'),
    path('api/predictions/me/', UserPredictionsView.as_view(), name='user_predictions'),
    path('api/predictions/knockout/submit/', SubmitKnockoutPredictionView.as_view(), name='submit_knockout_prediction'),
    path('api/predictions/knockout/me/', UserKnockoutPredictionsView.as_view(), name='user_knockout_predictions'),
    path('api/predictions/top-scorer/submit/', SubmitTopScorerPredictionView.as_view(), name='submit_top_scorer_prediction'),
    path('api/predictions/top-scorer/me/', UserTopScorerPredictionView.as_view(), name='user_top_scorer_prediction'),
    path('api/predictions/group/submit/', SubmitGroupPredictionView.as_view(), name='submit_group_prediction'),
    path('api/predictions/group/me/', UserGroupPredictionsView.as_view(), name='user_group_predictions'),
    path('api/predictions/top-team/submit/', SubmitTopTeamPredictionView.as_view(), name='submit_top_team_prediction'),
    path('api/predictions/top-team/me/', UserTopTeamPredictionView.as_view(), name='user_top_team_prediction'),
    path('api/teams/', TeamListView.as_view(), name='teams_list'),
    path('api/teams/top-scorers/', TopTeamGoalStatsView.as_view(), name='top_team_goal_stats'),
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
]
