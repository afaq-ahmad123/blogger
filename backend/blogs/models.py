from django.db import models
from account.models import User

# Create your models here.


class Blogs(models.Model):
    header = models.CharField(max_length=100)
    description = models.CharField(max_length=500)
    author = models.ForeignKey(User, to_field='username', on_delete=models.CASCADE)
    # author = models.CharField(max_length=20)
    image = models.ImageField(upload_to='static/images', blank=True)

