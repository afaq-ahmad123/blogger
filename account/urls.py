from django.urls import path, re_path
from .views import UserAPI

urlpatterns = [
    re_path('^(?P<id>[0-9]+)$', UserAPI.as_view()),
]
