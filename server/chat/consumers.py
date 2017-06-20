import json
from channels import Group
from .models import Message
from datetime import datetime

online_users = []
offline_users = []


def ws_connect(message):
    print message.content
    print message.content.get('path').split('/')[2]
    user_id = message.content.get('path').split('/')[2]
    online_users.append(user_id)
    Group("user-%s" % user_id).add(message.reply_channel)
    Group('users').add(message.reply_channel)

    Group('users').send({
        'text': json.dumps({
            'type': 'new login',
            'user': online_users,
            'is_logged_in': True
        })
    })
    message.reply_channel.send({'text': json.dumps({
        'type': 'new login',
        'user': online_users,
        'is_logged_in': True
    })})


def ws_disconnect(message):
    out_id = message.content.get('path').split('/')[2]
    online_users.remove(out_id)
    offline_users.append(out_id)
    print "disconnect"
    Group('users').send({
        'text': json.dumps({
            'type': 'logout',
            'user': offline_users,
            'is_logged_in': True
        })
    })
    Group('users').discard(message.reply_channel)


def ws_receive(message):
    text = message.content.get('text')
    if text:
        print text
        sender = text.split('/')[0]
        receiver = text.split('/')[2]
        body = text.split('/')[1]
        message.reply_channel.send({"text": json.dumps({'type': "msg", 'content': text})})
        Group("user-%s" % receiver).send({"text": json.dumps({'type': "msg", 'content': text})})
        try:
            msg = Message()
            msg.content = body
            msg.msg_from = sender
            msg.msg_to = receiver
            msg.time = datetime.now()
            msg.save()
            print "message store"

        except Exception as e:
            print e
