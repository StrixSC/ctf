```c++
  index = 0;
  while (index < 8) {
    tmp_char = flag[index];
    fputc((int)tmp_char,rev_this_stream);
    index = index + 1;
  }
  second_index = 8;
  while ((int)second_index < 0x17) {
    if ((second_index & 1) == 0) {
      tmp_char = flag[(int)second_index] + '\x05';
    }
    else {
      tmp_char = flag[(int)second_index] + -2;
    }
    fputc((int)tmp_char,rev_this_stream);
    second_index = second_index + 1;
  }
```

This is the part that is interesting to us. A bitwise AND is applied on the index of the loop with 1 to check if 0 is returned. If so, we append the current index' character + '\x05' to the flag. Otherwise, we append -2. 

We can use the script in `solve.py` to reverse this behaviour and reverse the cipher.

