// Brainfuck memory is expected to be able to under- and overflow.
function as_u8(n) {
    return n & 255; //no modulo operator Q_Q
}

// Used to print the current tape state (for debug purposes)
function tape_str(tape, inst, tp) {
    res = ""
    for (i in tape) {
        chr = i == tp ? inst : " "
        res += chr + tape[i].toString().padStart(3, " ") + chr
    }
    return res
}

// Interpreter for Brainfuck, a famous esoteric programming language
function interpret_bf(program, input="") {
    if (typeof program != "string") { 
        throw new Error("Program is not a string.")
    }

    tape = [0];
    tape_pointer = 0;
    input_pointer = 0;
    output = "";
    loop_stack = [];
    skip_until_brackets = 0;
    for(let program_pointer = 0; program_pointer < program.length; program_pointer++) {
        if (skip_until_brackets <= 0) {
            switch (program[program_pointer]) {
                case "+":
                    tape[tape_pointer] = as_u8(tape[tape_pointer] + 1);
                    break;
                case "-":
                    tape[tape_pointer] = as_u8(tape[tape_pointer] - 1);
                    break;
                case ">":
                    tape_pointer++;
                    if (tape_pointer >= tape.length) {
                        tape.push(0)
                    }
                    break;
                case "<":
                    tape_pointer--;
                    if (tape_pointer < 0) {
                        tape.unshift(0);
                        tape_pointer = 0;
                    }
                    break;
                case ",":
                    if (input_pointer >= input.length) {
                        tape[tape_pointer] = 0; // Return 0 for EOF
                    } else {
                        tape[tape_pointer] = as_u8(input.codePointAt(input_pointer));
                        input_pointer++;
                    }
                    break;
                case ".":
                    output += String.fromCodePoint(tape[tape_pointer]);
                    console.log(output.at(-1)+" ("+tape[tape_pointer]+") "+tape);
                    break;
                case "[":
                    if (tape[tape_pointer] == 0) {
                        skip_until_brackets++;
                    } else {
                        loop_stack.push(program_pointer);
                    }
                    break;
                case "]":
                    if (tape[tape_pointer] != 0) {
                        program_pointer = loop_stack.at(-1); //bc of for loop, actually jumps to instruction AFTER "["
                    } else {
                        loop_stack.pop();
                    }
                    break;
                // everything else is a comment
            }
        } else { // a while condition failed; skipping forward until matching bracket
            switch (program[program_pointer]) {
                case "[":
                    skip_until_brackets++;
                    break;
                case "]":
                    skip_until_brackets--;
                    break;
                // skip everything else
            }
        }
    }
    return output;
}

stdout = interpret_bf(">>>>--<-<<+[+[<+>--->->->-<<<]>]<<--.<++++++.<<-..<<.<+.>>.>>.<<<.+++.>>.>>-.<<<+.");
//stdout = interpret_bf("-[++[<++>->+++>+++<<]---->+]<<<<.<<<<-.<..<<+.<<<<.>>.>>>-.<.+++.>>.>-.<<<<<+.");
//stdout = interpret_bf("++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++.");
/* stdout = interpret_bf(`Calculate the value 256 and test if it's zero
If the interpreter errors on overflow this is where it'll happen
++++++++[>++++++++<-]>[<++++>-]
+<[>-<
    Not zero so multiply by 256 again to get 65536
    [>++++<-]>[<++++++++>-]<[>++++++++<-]
    +>[>
        # Print "32"
        ++++++++++[>+++++<-]>+.-.[-]<
    <[-]<->] <[>>
        # Print "16"
        +++++++[>+++++++<-]>.+++++.[-]<
<<-]] >[>
    # Print "8"
    ++++++++[>+++++++<-]>.[-]<
<-]<
# Print " bit cells\n"
+++++++++++[>+++>+++++++++>+++++++++>+<<<<-]>-.>-.+++++++.+++++++++++.<.
>>.++.+++++++..<-.>>-.
Clean up used cells
[[-]<]`); // */

console.log(`"${stdout}"`);

// module time
module.exports = interpret_bf;