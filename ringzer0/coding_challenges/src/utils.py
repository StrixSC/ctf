import re

def find_between(s, first, last):
    try:
        start = s.index(first) + len(first)
        end = s.index(last, start)
        return s[start:end]
    except ValueError:
        return ""

def find_flag(page):
    flag_regex = 'FLAG-[0-9a-zA-Z]*'
    pattern = re.compile(flag_regex)
    finds = re.search(pattern, page)
    return finds