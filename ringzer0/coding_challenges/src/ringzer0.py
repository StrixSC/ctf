import os
import requests
LOGIN_URL = 'https://ringzer0ctf.com/login'

def login() :
    username = os.environ.get("RINGZERO_USERNAME")
    password = os.environ.get("RINGZERO_PASSWORD")
    s = requests.Session()
    s.post(LOGIN_URL, {"username": username, "password": password})
    return s