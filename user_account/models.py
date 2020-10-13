from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import PermissionsMixin
from django.db.models.signals import post_save
from django.dispatch import receiver
# from rest_framework_simplejwt.tokens import RefreshToken
# Create your models here.


class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, username, email, password, **extra_fields):
        if not username:
            raise ValueError('Username must be given')
        if not email:
            raise ValueError('Email must be given')
        if not password:
            raise ValueError('Password must be set')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_user(self, extra_fields):
        username = extra_fields['username']
        password = extra_fields['password']
        name = extra_fields['name']
        # user_id = extra_fields['id']
        if not username:
            raise ValueError('Username must be given')
        if not password:
            raise ValueError('Password must be set')
        # id = user_id,
        user = User(username=username, name=name)
        print("model", user.id, user.is_active)
        user.set_password(password)
        user.auth_provider = extra_fields['provider']
        try:
            user.save(using=self.db)
        except Exception as e:
            print(e)
        print("yes ", user.check_password(password))
        return user

    def create_superuser(self, username, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must be set')
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Staff must be set')

        return self.create_user(username, email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField('username', unique=True, max_length=20)
    name = models.CharField('name', max_length=20, blank=True)
    email = models.EmailField('email address', blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    auth_provider = models.CharField(
        max_length=255, blank=True,
        null=False, default='facebook')
    # password1 =

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email', 'password']

    objects = UserManager()

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    def __unicode__(self):
        return 'User model'

    def __str__(self):
        return self.username

    def has_module_perms(self, app_label):
        return True

    # def tokens(self):
    #     refresh = RefreshToken.for_user(self)
    #     return {
    #         'refresh': str(refresh),
    #         'access': str(refresh.access_token)
    #     }

    def has_perm(self, perm, obj=None):
        return True

    def has_perms(self, perm_list, obj=None):
        return True


@receiver(post_save, sender=User)
def create_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
