from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import PostViewSet
from .views import RegistrationView, LoginView, ForgotPasswordView, ResetPasswordView
from .views import UploadAvatarView
from .views import UpdateUserStatsView, DeleteAccountView

post_router = DefaultRouter()
post_router.register(r'posts', PostViewSet)

urlpatterns = [
    path("register", RegistrationView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("forgotPassword", ForgotPasswordView.as_view(), name="forgotPassword"),
    path("resetPassword", ResetPasswordView.as_view(), name="resetPassword"),
    path("upload-avatar/", UploadAvatarView.as_view(), name="upload-avatar"),
    path('update-user-stats/', UpdateUserStatsView.as_view(), name='update_user_stats'),
    path('delete-account/', DeleteAccountView.as_view(), name='delete_account'),
]