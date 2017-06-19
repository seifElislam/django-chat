from django.conf.urls import url
from . import views
urlpatterns = [
    # url(r'^author/notify/(?P<num>[0-9]+)/$', views.authorNotify, name='authorNotify'),
    url(r'^messages/$', views.get_messages),
    url(r'^register/$', views.register),
    url(r'^login/$', views.login),
    url(r'^users/$', views.get_users),
]