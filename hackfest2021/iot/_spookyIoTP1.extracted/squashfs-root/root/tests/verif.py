import crypt
import decode

validHash = ''

hash = crypt.crypt(decode.decode(),validHash)
if(hash==validHash):
	print('Hash method verified.')
else:
	print('Nop, try again.')
