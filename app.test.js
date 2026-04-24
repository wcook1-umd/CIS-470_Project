const interpret_bf = require('./app.js')

describe('interpret_bf', () => {
    test('Blank program should output nothing', () => {
        expect(interpret_bf("")).toBe("");
    });

    test('Wrong-type input should crash', () => {
        expect(() => {interpret_bf(4)}).toThrow("Program is not a string.");
    });

    // Test moving left can insert correctly
    //test('"<" should crash if moving before the first memory location', () => {
    //    expect(() => {interpret_bf("<")}).toThrow("Attempted to move pointer beyond left end of tape");
    //});

    test('I/O: ",." should output the first character of input', () => {
        expect(interpret_bf(",.", input="Brainfuck")).toBe("B");
    });

    test('Underflow: "-." should output "ÿ"', () => {
        expect(interpret_bf("-.")).toBe("ÿ");
    });

    // Two "Hello, World!" programs I found online
    test('Program: should output "Hello, World!\\n"', () => {
        expect(interpret_bf(">++++++++[-<+++++++++>]<.>>+>-[+]++>++>+++[>[->+++<<+++>]<<]>-----.>->\
                             +++..+++.>-.<<+[>[+>+]>>]<--------------.>>.+++.------.--------.>+.>+.")).toBe("Hello, World!\n");
    });
    test('Program: should output "Hello, World!"', () => {
        expect(interpret_bf("+[-->-[>>+>-----<<]<--<---]>-.>>>+.>>..+++[.>]<<<<.+++.------.<<-.>>>>+.")).toBe("Hello, World!\n");
    });

    // I wrote this one myself :)
    test('7-Divisibility Tester: "2401" should return "yes"', () => {
        expect(interpret_bf(`
        ++++ ++++[>+++ +++<-]>   Set up tape
        >>>>++<<<              
        ,[                       Read input and determine divisibility
          <                      
          [<+>->-<]<          
          [>+<-]>>            
          [<++++>-]<          
          [->                 
            [---- --->]>[<]     
            <+++ +++          
          <]                  
          >>,
        ]
        >[                       print "no"
          >++++ ++++ ++++       
          [>+++ +++ +++<-]      
          >.+.                     
        ]
        >>[                      print "yes"
          +++ +++ +++           
          [<++++ +++ ++++       
           <+++ +++ +++>>-]     
          <.<++.>--- ---.       
        ]
        `, input="2401")).toBe("yes");
    });


    /* More test ideas:
       ensure nesting works
       check for 30000 cells somehow?
       ensure 255 + 1 = 0
       print null and see what happens
    */
})