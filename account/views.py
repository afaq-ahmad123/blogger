from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .models import User
from .serializer import UserSerializer


# Create your views here.

class UserAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = None
    lookup_field = 'id'
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated, )
    authentication_classes = (TokenAuthentication, )

    def get_queryset(self):
        self.queryset = User.objects.filter(username=self.request.user.username)
        return super(UserAPI, self).get_queryset()
