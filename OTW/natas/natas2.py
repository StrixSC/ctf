import os, sys
import requests
import re

#password = sJIJNW6ucpu6HPZ1ZAchaDtwd7oGrD14

user='natas2'
password = 'ZluruAthQk7Q2MqmDeTiUij2ZvWy2mBi'
url = 'http://'+user+'.natas.labs.overthewire.org'

#specific url for the challenge
newUrl = 'http://'+user+'.natas.labs.overthewire.org/files/users.txt'
website = requests.get(newUrl, auth=(user,password))
response = website.text

print (response)

foundPasswords = re.findall('natas3(.*)', response)
for p in range(len(foundPasswords)):
    print(foundPasswords[p])
