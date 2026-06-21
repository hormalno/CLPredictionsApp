from django.urls import path

from .views import ChangePasswordView, LeaderboardView, MeView, RegisterView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('me/', MeView.as_view(), name='me'),
    path('change-password/', ChangePasswordView.as_view(), name='change_password'),
    path('leaderboard/', LeaderboardView.as_view(), name='leaderboard'),
]
