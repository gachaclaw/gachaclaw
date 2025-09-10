from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import PostViewSet
from .views import RegistrationView, LoginView, ForgotPasswordView, ResetPasswordView
from .views import GetCreditsView
from .views import UploadAvatarView

post_router = DefaultRouter()
post_router.register(r'posts', PostViewSet)

urlpatterns = [
    path("register", RegistrationView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("forgotPassword", ForgotPasswordView.as_view(), name="forgotPassword"),
    path("resetPassword", ResetPasswordView.as_view(), name="resetPassword"),
    path("credits/", GetCreditsView.as_view(), name="get_credits"),
    path("credits/update/", GetCreditsView.as_view(), name="update_credits"),
    path("upload-avatar/", UploadAvatarView.as_view(), name="upload-avatar"),
]