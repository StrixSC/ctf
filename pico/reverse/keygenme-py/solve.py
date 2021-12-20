import hashlib
username_trial = b"MORTON"

vals = []
def solve():
    vals.append(hashlib.sha256(username_trial).hexdigest()[4])
    vals.append(hashlib.sha256(username_trial).hexdigest()[5])
    vals.append(hashlib.sha256(username_trial).hexdigest()[3])
    vals.append(hashlib.sha256(username_trial).hexdigest()[6])
    vals.append(hashlib.sha256(username_trial).hexdigest()[2])
    vals.append(hashlib.sha256(username_trial).hexdigest()[7])
    vals.append(hashlib.sha256(username_trial).hexdigest()[1])
    vals.append(hashlib.sha256(username_trial).hexdigest()[8])
    print('picoCTF{1n_7h3_|<3y_of_' + ''.join(vals) + '}')

if __name__ == '__main__':
    solve()