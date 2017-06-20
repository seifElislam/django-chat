# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models


class Message(models.Model):
    content = models.CharField(max_length=100)
    time = models.DateTimeField()
    msg_from = models.IntegerField(default=0)
    msg_to = models.IntegerField(default=0)
