# Brainfuck Interpreter

Brainfuck is a famously simple programming language with only eight single-character commands. 
A Brainfuck program implicitly has access to an infinite array of cells, each of which contains a number (initially 0).

Brainfuck's commands are as follows:

- `+` and `-`: Increment and decrement the number in the current cell. 
Most interpreters (including this one) use a single byte for each number and allow under- and overflow.

- `>` and `<`: Move the pointer to the next and previous cell respectively.
This interpreter uses a bidirectional tape, so there are infinitely many cells on both sides.

- `,`: Gets a character from input and stores its value in the current cell.

- `.`: Outputs the value in the current cell as a character.

- `[` and `]`: Together form a "while current cell is not 0" loop.

Any other character is considered a comment and is ignored.

## Examples

This program prints "Hello, World!"
```
Character values: 72 101 108 108 111 44 32 87 111 114 108 100 33 

++++++
  *6
[>+++<-]>
   0  *18
[>++++>++++++>++++++>++>++>+++++<<<<<<-]>
   0    0 *72 108 108  36  36  90
.>
   0    0  72*108 108  36  36  90  (H)
-------.>
   0    0  72 101*108  36  36  90  (He)
..+++.>
   0    0  72 101 111 *36  36  90  (Hello)
++++++++.>
   0    0  72 101 111  44 *36  90  (Hello_) (Can't write a comma in comments but I promise it prints one)
----.>
   0    0  72 101 111  44  32 *90  (Hello_ )
---.<<<
   0    0  72 101*111  44  32  87  (Hello_ W)
.+++.------.<
   0    0  72*101 108  44  32  87  (Hello_ Worl)
-.>>>
   0    0  72 100 108  44 *32  87  (Hello_ World)
+.
   0    0  72 100 108  44 *33  87  (Hello_ World!)
```

This program determines if its input is a multiple of 7.
```
hm
```


# ignore this
```
The slides should contain:
1. Group members' names and each member's role in the project
      Me
2. Project title
      uhm. "Brainfuck Interpreter"?
3. Detailed explanation of Project Requirements (function by function)
      Try not to copy+paste from esolangs.org
4. Version control and changes
      uhm.. ive been using GitHub?? Does that count??
5. Unit tests and the results of the Unit tests
      I'm assuming this means a .test.js file
6. Integration Test (if applicable).
      I think it isn't? Cause it's just a tiny classifyTriangle-esque thing
      I'm worried it should be. That I should write a frontend that id have to
      Is this docking? Dockerfile?
7. Deployment using GitHub workflows (if applicable)
      This is that Actions stuff, okie
```