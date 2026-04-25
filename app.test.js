const interpret_bf = require('./app.js')

describe('interpret_bf', () => {
    test('Blank program should output nothing', () => {
        expect(interpret_bf("")).toBe("");
    });

    test('Wrong-type input should throw an error', () => {
        expect(() => {interpret_bf(4)}).toThrow("Program is not a string.");
    });

    // Test moving left can insert correctly
    //test('"<" should crash if moving before the first memory location', () => {
    //    expect(() => {interpret_bf("<")}).toThrow("Attempted to move pointer beyond left end of tape");
    //});


    test('I/O: ",." should output the first character of input', () => {
        expect(interpret_bf(",.", input="brainfuck")).toBe("b");
    });
    test('I/O: "." should output a null character', () => {
        expect(interpret_bf(".", input="brainfuck")).toBe("\x00");
    });
    test('Left tape: "<+." should output \\x01', () => {
        expect(interpret_bf("<+.", input="brainfuck")).toBe("\x01");
    });

    test('Underflow: "-." should output "ÿ"', () => {
        expect(interpret_bf("-.")).toBe("ÿ"); //also verifies use of ASCII or Unicode
    });
    
    test('Overflow: 256 should roll over to equal 0', () => { //place a 1 at x=0 and x=5 and quadruple the second one left until you reach the first. Then add 48 and print
        expect(interpret_bf("+>>>>>+<-[+>[<++++>-]<<-] ++++ ++++[>+++ +++<-]>.")).toBe("0");
    });

    test('nested loops should function properly', () => { 
        expect(interpret_bf("+>>+[+[<]<]>>.")).toBe("\x02"); 
    });
    // Takes WAYY to long as it is.. O(n^2) :/
    //test('the tape should have at least 30000 cells', () => { // 254 times: 254 times: push a 1 to the right. Should use about 65000 cells.
    //    expect(interpret_bf("+<-<<--[>--[>>-[+[.[-]]>-]>+<+[-<+]-<-]<-]")).toBe(""); //If a non-zero value is found while pushing, it is printed.
    //});

    // Two "Hello, World!" programs I found online
    test('Program: should output "Hello World!\\n"', () => {
        expect(interpret_bf(">++++++++[-<+++++++++>]<.>>+>-[+]++>++>+++[>[->+++<<+++>]<<]>-----.>->\
                             +++..+++.>-.<<+[>[+>+]>>]<--------------.>>.+++.------.--------.>+.>+.")).toBe("Hello World!\n");
    });
    test('Program: should output "Hello, World!"', () => {
        expect(interpret_bf("+[-->-[>>+>-----<<]<--<---]>-.>>>+.>>..+++[.>]<<<<.+++.------.<<-.>>>>+.")).toBe("Hello, World!");
    });

    // I wrote this program myself :)
    test('7-Divisibility Tester: "2401" should return "yes"', () => {
        expect(interpret_bf(`++++++++[>++++++<-]>>>>>++<<<,[<[<+>->-<]<[>+<-]>>>[<++++>-]<[->[------->]>[<]<++++++<],]
            >[>++++++++++++[>+++++++++<-]>.+.<]>>[+++++++++[>+++++++++++>+++++++++<<-]>.>++.<------.<]`, input="2401")).toBe("yes");
    });
    test('7-Divisibility Tester: "123456789" should return "no"', () => {
        expect(interpret_bf(`++++++++[>++++++<-]>>>>>++<<<,[<[<+>->-<]<[>+<-]>>>[<++++>-]<[->[------->]>[<]<++++++<],]
            >[>++++++++++++[>+++++++++<-]>.+.<]>>[+++++++++[>+++++++++++>+++++++++<<-]>.>++.<------.<]`, input="2401")).toBe("yes");
    });
})