// Brainfuck memory is expected to be able to under- and overflow.
function as_u8(n) {
    return n % 256;
}

// Interpreter for Brainfuck, a famous esoteric programming language
function interpret_bf(program, input="") {
    if (typeof program != "string") { 
        throw new Error("Argument is not a string.")
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
                        tape.append(0)
                    }
                    break;
                case "<":
                    tape_pointer--;
                    if (tape_pointer < 0) {
                        throw new Error("Attempted to move pointer beyond left end of tape");
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
                    break;
                case "[":
                    if (tape[tape_pointer] == 0) {
                        is_skipping = true;
                    } else {
                        loop_stack.append(program_pointer)
                    }
                    break;
                case "]":
                    if (tape[tape_pointer] != 0) {
                        program_pointer = loop_stack.at(-1);
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

// module time
module.exports = interpret_bf;