from django.urls import path, re_path
from .views import UserAPI, UserGet

urlpatterns = [
    re_path('^(?P<id>[0-9]+)$', UserAPI.as_view()),
    path('', UserGet.as_view()),
]
