curl 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=a40d73df-6591-4eea-96a1-8fbe387d5aeb' \
   -H 'Content-Type: application/json' \
   -d '
   {
        "msgtype": "text",
        "text": {
            "content": "hello world"
        }
   }'
