import os, sys
import requests
import re

#completed, 
#password = gtVrDuiDfck831PqWsLEZy5gyDz1clto

user='natas0'
password = 'natas0'
url = 'http://'+user+'.natas.labs.overthewire.org'

website = requests.get(url, auth=(user,password))
response = website.text

foundPasswords = re.findall('natas1(.*)', response)

for p in range(len(foundPasswords)):
    print(foundPasswords[p])
