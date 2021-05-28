# CSAW-DTCC Strix | Fast Maths

import requests
import re
import os
import time

start_time = time.time()

challengeUrl = 'https://metaproblems.com/content/fastmath/'
postUrl = 'https://metaproblems.com/content/fastmath/grade.php?refresh=672920&answer='
html_file = open('flag-page.html', 'w')
s = requests.Session()

message = s.post(challengeUrl).text.split('h2')[1].replace('style="color:blue;">', '').replace(' = ?</', '').strip().split(' ')
mathResult = int(message[0]) + int(message[2]) - int(message[4]) 
html_file.write(s.post(postUrl + str(mathResult)).text)
print(time.time() - start_time)