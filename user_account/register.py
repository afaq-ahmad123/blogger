from django.contrib.auth import authenticate
from .models import User
import os
import random
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings


def generate_username(name):

    username = "".join(name.split(' ')).lower()
    if not User.objects.filter(username=username).exists():
        return username
    else:
        random_username = username + str(random.randint(0, 1000))
        return generate_username(random_username)


def register_social_user(provider, user_id, name):
    filtered_user_by_email = User.objects.filter(username=str(user_id))
    if filtered_user_by_email.exists():

        if provider == filtered_user_by_email[0].auth_provider:
            print("exists", user_id)
            registered_user = authenticate(
                username=str(user_id), password=settings.SOCIAL_AUTH_FACEBOOK_SECRET[0:10])

            return {
                'username': registered_user.username,
                'name': registered_user.name,
                'tokens': registered_user.tokens()}

        else:
            raise AuthenticationFailed(
                detail='Please continue your login using ' + filtered_user_by_email[0].auth_provider)

    else:
        user = {
            'username': str(user_id),
            # 'username': generate_username(name),
            # 'email': email,
            'name': name,
            'provider': provider,
            'password': settings.SOCIAL_AUTH_FACEBOOK_SECRET[0:10]}
        print(user)
        user = User.objects.create_auth_user(user)
        # user.is_active = True
        # user.is_staff = True
        # user.auth_provider = provider
        user.save()
        print("return", user)

        new_user = authenticate(
            username=user['username'], password=settings.SOCIAL_AUTH_FACEBOOK_SECRET[0:10])
        print("new user", new_user)
        return {
            # 'email': new_user.email,
            'username': new_user.username,
            'password': settings.SOCIAL_AUTH_FACEBOOK_SECRET[0:10],
            # 'tokens': new_user.tokens()
        }
