const MarkovMachine = require('./markov');
let mm;
describe('test markov', function () {
    beforeAll(function () {
        mm = new MarkovMachine("the cat in the hat");
    })
    test('create markov Machine', function () {
        expect(mm).toBeInstanceOf(MarkovMachine)
        expect(mm.words).toContain("cat")
    })
    test('makeChains function', function () {
        expect(mm.chains).toEqual(expect.any(Map))
        expect(mm.chains.keys()).toContain("the")
        expect(mm.chains.keys()).toContain("cat")
    })
    test('makeText function', function () {
        let text = mm.makeText();
        expect(text).toEqual(expect.any(String))
        let textArr = text.split(/[ \r\n]+/);
        let wordArr = ["the", "cat", "in", "the", "hat"]
        expect(wordArr).toEqual(expect.arrayContaining(textArr))
    })
    test('cuts off at length', function () {
        let phrases = ["the cat", "cat in", "in the", "the hat", "hat "];
        let mm2 = new MarkovMachine("the cat in the hat");
        let output = mm2.makeText(2);
        let outputWords = output.split(/[ \r\n]+/);
        expect([1, 2]).toContain(outputWords.length);
    })
    test('choice picks from array', function () {
        expect(MarkovMachine.choice([1, 1, 1])).toEqual(1);
        expect([1, 2, 3]).toContain(MarkovMachine.choice([1, 2, 3]))
    })
})
