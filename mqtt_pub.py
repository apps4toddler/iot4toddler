#!/usr/bin/env python
# -*- coding: utf-8 -*-

import paho.mqtt.client as mqtt
from time import sleep
import random

def on_connect(client, userdata, flag, rc):
  print("Connected with result code " + str(rc))

def on_disconnect(client, userdata, flag, rc):
  if rc != 0:
    print("Unexpected disconnection.")

def on_publish(client, userdata, mid):
  print("publish: {0}".format(mid))

def main():
  topic = "topic_test01"
  cnt = 0
  client = mqtt.Client()
  client.on_connect = on_connect
  client.on_disconnect = on_disconnect
  client.on_publish = on_publish

  client.connect("localhost", 1883, 60)

  client.loop_start()

  while True:
    send_msg = '{"No":%d,"Rand":%d}' % (cnt, random.randrange(255))
    cnt += 1
    if (cnt >= 1000):
      cnt = 0
    
    print(send_msg)

    client.publish(topic,send_msg)
    sleep(1)

if __name__ == '__main__':
  main()

