from django.urls import path, re_path
from .views import UserAPI, UserGet, FacebookSocialAuthView


urlpatterns = [
    re_path('^(?P<id>[0-9]+)$', UserAPI.as_view()),
    path('login/', FacebookSocialAuthView.as_view()),
    path('', UserGet.as_view()),
]
