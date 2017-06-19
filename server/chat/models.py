# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth.models import User
from django.db import models
from django.conf import settings
from django.db import models

class Message(models.Model):
    content = models.CharField(max_length=100)
    time = models.DateTimeField()
    msg_from = models.ForeignKey(User, related_name='sender')
    msg_to = models.ForeignKey(User, related_name='receiver')
