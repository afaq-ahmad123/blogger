from .serializer import ListSerializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Blogs
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.shortcuts import get_object_or_404

# Create your views here.


class BlogListCreateAPI(generics.ListCreateAPIView):
    queryset = None
    serializer_class = ListSerializer
    permission_classes = (IsAuthenticated, )
    authentication_classes = (TokenAuthentication, )

    def get_queryset(self):
        self.queryset = Blogs.objects.all()
        return super(BlogListCreateAPI, self).get_queryset()

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        data['author'] = self.request.user.username
        data = self.serializer_class(data=data)
        if data.is_valid():
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

    def patch(self, request, *args, **kwargs):
        data = request.data.copy()
        qs = get_object_or_404(Blogs, id=kwargs['id'])
        serializer = self.serializer_class(qs, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


