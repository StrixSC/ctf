
def decode():
	
	value = ['4648', '572d', '3030', '7370', '6854', '7331', '3043', '6564', '7331', '7634', '3134', '346c','6c62','33']
	newVal = ""
	decode = ""
	for i in value:
		valSwap = bytearray.fromhex(i)
		valSwap.reverse()
		newVal = str(valSwap, "utf-8")
		decode = decode + newVal
	return decode
	
print(decode())
