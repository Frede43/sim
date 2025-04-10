from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

class EmailOrUsernameModelBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        UserModel = get_user_model()
        try:
            # Essayer d'abord avec l'email
            user = UserModel.objects.get(email=username)
        except UserModel.DoesNotExist:
            try:
                # Si l'email ne fonctionne pas, essayer avec le nom d'utilisateur
                user = UserModel.objects.get(username=username)
            except UserModel.DoesNotExist:
                return None

        if user.check_password(password):
            return user
        return None
