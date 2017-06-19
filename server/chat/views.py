# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from jwt_authentication import JWTAuthentication
from jose import jws
from django.contrib.auth.models import User
import ast
from django.contrib.auth import authenticate, login as auth_login, logout
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.shortcuts import render

from django.views.decorators.csrf import csrf_exempt
from datetime import timedelta, date
from django.core import serializers

auth = JWTAuthentication()


def get_messages(request):
    if auth.authenticate(request):
        return JsonResponse({'msg': 'ok'}, status=200)
    else:
        return JsonResponse({'msg': 'no'}, status=403)


def get_users(request):
    print "get users"
    if auth.authenticate(request):
        users = User.objects.all()

        return HttpResponse(serializers.serialize('json', users, fields=('username')), status=200)
        # return JsonResponse({'msg': 'ok'}, status=200)
    else:
        return JsonResponse({'msg': 'no'}, status=403)


@csrf_exempt
def register(request):
    if request.method == 'POST':
        dict = ast.literal_eval(request.body)
        params = {}
        params['username'] = dict["username"]
        params['password'] = dict["password"]
        params['email'] = dict["email"]
        try:
            user = User.objects.create_user(params['username'], params['email'], params['password'])
            return JsonResponse({'status':"done"})
        except :
            return JsonResponse({'status':"failed"})
    # if request.method == 'GET':
    #     all_users = User.objects.all()
    #     return HttpResponse(serializers.serialize('json', all_users, fields=('username')), status=200)

@csrf_exempt
def login(request):
    if request.method == 'POST':
        dict = ast.literal_eval(request.body)
        print dict
        username = dict["username"]
        password = dict["password"]
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
