from django.urls import path

from .views import LeaderboardView, MeView, RegisterView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('me/', MeView.as_view(), name='me'),
    path('leaderboard/', LeaderboardView.as_view(), name='leaderboard'),
]
