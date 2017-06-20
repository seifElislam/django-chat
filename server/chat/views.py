# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from jwt_authentication import JWTAuthentication
from jose import jws
from django.contrib.auth.models import User
import ast
from django.contrib.auth import authenticate, login as auth_login, logout
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from .models import *
from django.db.models import Q
from django.views.decorators.csrf import csrf_exempt
from datetime import timedelta, date
from django.core import serializers


auth = JWTAuthentication()


def get_messages(request, user_id):
    if auth.authenticate(request):
        print "get msgs of ", user_id
        msgs = Message.objects.all().filter(Q(msg_from=user_id) | Q(msg_to=user_id))
        return HttpResponse(serializers.serialize('json', msgs), status=200)
    else:
        return JsonResponse({'msg': 'Unauthorized'}, status=401)


def get_users(request):
    print "get users"
    if auth.authenticate(request):
        users = User.objects.all()

        return HttpResponse(serializers.serialize('json', users, fields='username'), status=200)
        # return JsonResponse({'msg': 'ok'}, status=200)
    else:
        return JsonResponse({'msg': 'Unauthorized'}, status=401)


@csrf_exempt
def register(request):
    if request.method == 'POST':
        user_data = ast.literal_eval(request.body)
        params = {}
        params['username'] = user_data["username"]
        params['password'] = user_data["password"]
        params['email'] = user_data["email"]
        try:
            user = User.objects.create_user(params['username'], params['email'], params['password'])
            return JsonResponse({'status': "done"})
        except Exception as e:
            print e
            return JsonResponse({'status': "failed"})
    # if request.method == 'GET':
    #     all_users = User.objects.all()
    #     return HttpResponse(serializers.serialize('json', all_users, fields=('username')), status=200)


@csrf_exempt
def login(request):
    if request.method == 'POST':
        credentials = ast.literal_eval(request.body)
        print dict
        username = credentials["username"]
        password = credentials["password"]
        user = authenticate(username=username, password=password)
        print user
        if user:
            if user.is_active:
                user = authenticate(username=username, password=password)
                expiry = date.today() + timedelta(days=7)
                expiry_date = expiry.strftime("%Y-%m-%d %H:%M:%S.%f")
                token = jws.sign({'username': user.username, 'expiry': expiry_date}, 'seKre8', algorithm='HS256')
                user.token = token
                print token
                auth_login(request, user)
                # return HttpResponse(serializers.serialize('json', user), status=200)
                return JsonResponse({'username': user.username, 'id': user.id, 'token': token}, status=200)
            else:
                return HttpResponse('Your account is disabled')
        else:
            print("Invalid login details")

            return HttpResponse("wait")
