from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from rest_framework.authtoken.models import Token
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _createuser(self, username, email, password, **extra_fields):
        if not username:
            raise ValueError('Username must be given')
        if not email:
            raise ValueError('Email must be given')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def createuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', False)
        return self._createuser(username, email, password, **extra_fields)

    def create_superuser(self, username, email, password, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must be set')
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Staff must be set')

        return self._createuser(username, email, password, **extra_fields)


class User(AbstractBaseUser):
    username = models.CharField('username', unique=True, max_length=20)
    email = models.EmailField('email address', unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'password']

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    objects = UserManager()

    def __unicode__(self):
        return 'User model'

    def __str__(self):
        return self.username

    def has_module_perms(self, app_label):
        return True

    def has_perm(self, perm, obj=None):
        return True

    def has_perms(self, perm_list, obj=None):
        return True


@receiver(post_save, sender=User)
def create_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)