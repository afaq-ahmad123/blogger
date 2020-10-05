from django.urls import path, re_path
from .views import BlogAPI, BlogListCreateAPI

urlpatterns = [
    path('', BlogListCreateAPI.as_view()),
    re_path('^(?P<id>[0-9]+)$', BlogAPI.as_view()),
]
