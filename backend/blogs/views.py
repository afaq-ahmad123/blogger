from .serializer import ListSerializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
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
        self.queryset = Blogs.objects.all()
            # .filter(author=self.request.user)
        return super(BlogListCreateAPI, self).get_queryset()

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        data['author'] = self.request.user.username
        print(str(data))
        data = self.serializer_class(data=data)
        if data.is_valid():
            print('valid')
            data.save()
            return Response(data.data, status=status.HTTP_201_CREATED)
        return Response(data.errors, status=status.HTTP_400_BAD_REQUEST)


class BlogAPI(generics.RetrieveUpdateDestroyAPIView):
    queryset = None
    serializer_class = ListSerializer
    permission_classes = (IsAuthenticated, )
    authentication_classes = (TokenAuthentication, )
    lookup_field = 'id'

    def get_queryset(self):
        self.queryset = Blogs.objects.filter(author=self.request.user)
        return super(BlogAPI, self).get_queryset()
