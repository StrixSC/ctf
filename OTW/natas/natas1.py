import os, sys
import requests
import re

#password = ZluruAthQk7Q2MqmDeTiUij2ZvWy2mBi

user='natas1'
password = 'gtVrDuiDfck831PqWsLEZy5gyDz1clto'
url = 'http://'+user+'.natas.labs.overthewire.org'

website = requests.get(url, auth=(user,password))
response = website.text

foundPasswords = re.findall('natas2(.*)', response)

for p in range(len(foundPasswords)):
    print(foundPasswords[p])
