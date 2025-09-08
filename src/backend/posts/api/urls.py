from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import PostViewSet
from .views import RegistrationView, LoginView, ForgotPasswordView, ResetPasswordView
from .views import GetCreditsView

post_router = DefaultRouter()
post_router.register(r'posts', PostViewSet)

urlpatterns = [
    path("register", RegistrationView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("forgotPassword", ForgotPasswordView.as_view(), name="forgotPassword"),
    path("resetPassword", ResetPasswordView.as_view(), name="resetPassword"),
    path("credits/", GetCreditsView.as_view(), name="get_credits"),
]