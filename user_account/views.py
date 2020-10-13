from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework import status
from .serializer import UserSerializer

from .models import User

from .serializer import FacebookSocialAuthSerializer


class FacebookSocialAuthView(generics.GenericAPIView):

    permission_classes = [AllowAny]
    serializer_class = FacebookSocialAuthSerializer

    def post(self, request):
        """
        POST with "auth_token"
        Send an access token as from facebook to get user information
        """
        serializer = self.serializer_class(data=request.data)
        # print(serializer)
        serializer.is_valid(raise_exception=True)
        data = ((serializer.validated_data)['auth_token'])
        return Response(data, status=status.HTTP_200_OK)


class UserAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = None
    lookup_field = 'id'
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated, )
    authentication_classes = (TokenAuthentication, )

    def get_queryset(self):
        self.queryset = User.objects.filter(username=self.request.user.username)
        return super(UserAPI, self).get_queryset()


class UserGet(generics.ListAPIView):
    queryset = None
    serializer_class = UserSerializer

    def get_queryset(self):
        self.queryset = User.objects.filter(username=self.request.user.username)
        return super(UserGet, self).get_queryset()
