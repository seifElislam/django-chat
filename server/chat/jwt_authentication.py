from pyexpat import model

from exceptions import *
from jose import jws, exceptions
from django.contrib.auth.models import User
from datetime import datetime
import ast


class JWTAuthentication(object):
    """
    Simple token based authentication.
    Clients should authenticate by passing the token key in the "Authorization"
    HTTP header, prepended with the string "Token ".  For example:
    Authorization: Token 401f7ac837da42b97f613d789819ff93537bee6a
    """

    def authenticate(self, request):
        auth = request.META['HTTP_AUTHORIZATION'].split()

        if not auth or auth[0].lower() != b'token':
            return None

        try:
            token = auth[1].decode()
        except UnicodeError:
            msg = ('Invalid token header. Token string should not contain invalid characters.')
            raise exceptions.AuthenticationFailed(msg)

        return self.authenticate_credentials(token)

    def authenticate_credentials(self, payload):

        decoded_dict = jws.verify(payload, 'seKre8', algorithms=['HS256'])
        print decoded_dict
        dict = ast.literal_eval(decoded_dict)
        username = dict.get('username', None)
        expiry = dict.get('expiry', None)
        exp_time = datetime.strptime(expiry, "%Y-%m-%d %H:%M:%S.%f").date()
        print exp_time
        try:
            usr = User.objects.get(username=username)
        except model.DoesNotExist:
            raise exceptions.AuthenticationFailed('Invalid token.')

        if not usr.is_active:
            raise exceptions.AuthenticationFailed('User inactive or deleted.')

        if exp_time < datetime.now().date():
            raise exceptions.AuthenticationFailed('Token Expired.')

        return True
        # return (usr, payload)

    def authenticate_header(self, request):
        return 'Token'
