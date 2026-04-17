const interpret_bf = require('./app.js')

describe('interpret_bf', () => {
    test('Blank program should output nothing', () => {
        expect(interpret_bf("")).toBe("");
    });

    test('"<" should crash if moving before the first memory location', () => {
        expect(() => {interpret_bf("<")}).toThrow("Attempted to move pointer beyond left end of tape");
    });

    test('",." should output the first character of input', () => {
        expect(interpret_bf(",.", input="Brainfuck")).toBe("B");
    });
})