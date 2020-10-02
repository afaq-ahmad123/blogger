from rest_framework import serializers
from .models import Blogs


class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blogs
        fields = ['id', 'header', 'description', 'author', 'image']
