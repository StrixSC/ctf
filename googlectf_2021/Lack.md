
### Notes:

```bash
$ curl -I https://letschat-web.2021.ctfcompetition.com/
HTTP/2 200 
content-type: text/html
date: Sat, 17 Jul 2021 00:04:16 GMT
via: 1.1 google
alt-svc: clear
```

- It's using HTTP/2
- The "public" channel is open to everyone
- It doesn't seem to allow markup in the messages, or in the titles of each room
- it doesnt seem to allow script injection in the messages or in the channel anmes
- All the messages are stored inside of files in a remote db it would seem. For example: 
```http
GET https://letschat-messages-web.2021.ctfcompetition.com/c2c036d4-e693-11eb-9805-362ad9a78588 HTTP/2
```
Returns "Playeref4b1955:flag"

### Enumerating rooms

The `https://letschat-web.2021.ctfcompetition.com/poll` request is firiing every few seconds in order to update the rooms

There is a parameter that seems to fetch the data from the rooms.

Here is a response from when we say room:flag

```json
{"flag":["f312227b-e693-11eb-86e4-7253a5121377","df66d197-e693-11eb-86e4-7253a5121377","da0987b2-e693-11eb-86e4-7253a5121377","c2c036d0-e693-11eb-9805-362ad9a78588","bb5d941c-e693-11eb-88a1-a2a63078d4f6","b4366721-e693-11eb-88a1-a2a63078d4f6","b2b2b60c-e693-11eb-86e4-7253a5121377","b2a851a1-e693-11eb-9805-362ad9a78588","2e6400e3-e693-11eb-92ce-9678c088ab04","c95cc501-e68e-11eb-88a1-a2a63078d4f6"]}
```

It would seem like each id is a room key that we can use to access the room. initial thoughts tell me that the flag could be in a room somewhere and we have to find that room.