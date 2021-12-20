	.arch armv8-a
	.file	"chall.c"
	.text
	.align	2
	.global	func1
	.type	func1, %function
func1:
	sub	sp, sp, #16  // Subroutine call - change the stack pointer to a different scope.
	// Lines 10 to 13 inclusively swap the contents of the registers w1 and w0:
	str	w0, [sp, 12] 
	str	w1, [sp, 8]	 
	ldr	w1, [sp, 12] 
	ldr	w0, [sp, 8]	 
	// Compares the values of both registers, previously swapped:
	cmp	w1, w0
	// bl* is a subroutine call. In this case, "bls" jumps to the .L2 subroutine if the previous comparison is smaller. (w1 < w0)
	bls	.L2
	ldr	w0, [sp, 12] // Load [sp, 12] into w0 and "branch" to .L3
	b	.L3
.L2:
	ldr	w0, [sp, 8]
.L3:
	add	sp, sp, 16	// Set the stack pointer back to the return address.
	ret				
	.size	func1, .-func1
	.section	.rodata
	.align	3
.LC0:
	.string	"Result: %ld\n"
	.text
	.align	2
	.global	main
	.type	main, %function
main:
	// A lot of these instructions are bootstrapping instructions.
	stp	x29, x30, [sp, -48]!
	add	x29, sp, 0
	str	x19, [sp, 16]
	str	w0, [x29, 44]
	str	x1, [x29, 32]
	ldr	x0, [x29, 32]
	add	x0, x0, 8
	ldr	x0, [x0]
	bl	atoi
	mov	w19, w0
	ldr	x0, [x29, 32]
	add	x0, x0, 16
	ldr	x0, [x0]
	bl	atoi	
	mov	w1, w0
	mov	w0, w19
	bl	func1
	mov	w1, w0
	adrp	x0, .LC0
	add	x0, x0, :lo12:.LC0
	bl	printf
	mov	w0, 0
	ldr	x19, [sp, 16]
	ldp	x29, x30, [sp], 48
	ret
	.size	main, .-main
	.ident	"GCC: (Ubuntu/Linaro 7.5.0-3ubuntu1~18.04) 7.5.0"
	.section	.note.GNU-stack,"",@progbits
