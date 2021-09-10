# [Reverse] Shop

For this challenge, we're given an executable:

```bash
$ file source
source: ELF 32-bit LSB executable, Intel 80386, version 1 (SYSV), statically linked, Go BuildID=Wq2z6hkBrrAovu6w8dMb/chyUPt3_NgRB5zVfMpf8/99tYvdYHy3xNdHp4wuxA/ClEGFX9e3WU6qjzPxg9K, with debug_info, not stripped
```

The file is not stripped, meaning that debugging symbols are still there. 

Executing the program outputs the following:

```bash
$ ./source                
Welcome to the market!
=====================
You have 40 coins
	Item		Price	Count
(0) Quiet Quiches	10	12
(1) Average Apple	15	8
(2) Fruitful Flag	100	1
(3) Sell an Item
(4) Exit
Choose an option:
```

Solving the challenge required a bit of manual fuzzing. Since this is a shop, the amount of coin taken when buying an item is calculated as so:

YOUR COINS = YOUR COINS - (ITEM PRICE * ITEM QUANTITY)

By inputting various different symbols, we can see that negative numbers are not filtered. Therefore by inputting a negative number as the item quantity, we can cheat the system, since two negatives make a positive

`=> YOUR COINS = YOUR COINS - (ITEM PRICE * (-) ITEM QUANTITY)`
`=> YOUR COINS = YOUR COINS + (ITEM PRICE * ITEM QUANTITY)`

Once we get enough money this way, we can ask to buy the `Fruitful Flag`. Then decode the list of decimals given using a decoder like [CyberChef](https://gchq.github.io/CyberChef/#recipe=From_Decimal('Space',false)&input=MTEyIDEwNSA5OSAxMTEgNjcgODQgNzAgMTIzIDk4IDUyIDEwMCA5NSA5OCAxMTQgMTExIDEwMyAxMTQgOTcgMTA5IDEwOSAxMDEgMTE0IDk1IDU3IDk5IDQ5IDQ5IDU2IDk4IDk4IDEwMiAxMjU).
