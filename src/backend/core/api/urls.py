from rest_framework.routers import DefaultRouter
from django.urls import path, include
from posts.api.views import PostViewSet, LoginView, RegistrationView, ForgotPasswordView, ResetPasswordView, GetCreditsView, UploadAvatarView

router = DefaultRouter()
router.register(r'posts', PostViewSet, basename='post')

urlpatterns = [
    path('', include(router.urls)),                  # /api/posts/
    path('auth/register/', RegistrationView.as_view(), name='register'),
    path('auth/login/', LoginView.as_view(), name='login'),
    path('auth/forgot-password/', ForgotPasswordView.as_view(), name='forgot'),
    path('auth/reset-password/', ResetPasswordView.as_view(), name='reset'),
    path('credits/', GetCreditsView.as_view(), name='get_credits'),
    path('credits/update/', GetCreditsView.as_view(), name='update_credits'),
    path("upload-avatar/", UploadAvatarView.as_view(), name="upload-avatar"),
]