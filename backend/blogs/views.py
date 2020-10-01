from django.shortcuts import render
from .serializer import ListSerializer
from rest_framework import generics
from .models import Blogs
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

# Create your views here.


class BlogListCreateAPI(generics.ListCreateAPIView):
    queryset = None
    serializer_class = ListSerializer
    permission_classes = (IsAuthenticated, )
    authentication_classes = (TokenAuthentication, )

    def get_queryset(self):
        self.queryset = Blogs.objects.filter(author=self.request.user)
        return super(BlogListCreateAPI, self).get_queryset()


class BlogAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = None
    serializer_class = ListSerializer
    permission_classes = (IsAuthenticated, )
    authentication_classes = (TokenAuthentication, )
    lookup_field = 'id'

    def get_queryset(self):
        self.queryset = Blogs.objects.filter(author=self.request.user)
        return super(BlogAPI, self).get_queryset()
