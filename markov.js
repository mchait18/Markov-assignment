/** Textual markov chain generator */
const fs = require('fs');

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    const chains = new Map()
    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i]
      let nextWord = this.words[i + 1] || null;
      if (chains.has(word)) chains.get(word).push(nextWord)
      else chains.set(word, [nextWord])

      // this.chains[word] = this.words.filter(function (value, index, array) {
      //   return array[index - 1] == word
      // })
    }
    this.chains = chains
  }
  /** Pick random choice from array */

  static choice(ar) {
    return ar[Math.floor(Math.random() * ar.length)];
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    // pick a random key to begin
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.choice(keys);
    let out = [];

    // produce markov chain until reaching termination word
    while (out.length < numWords && key !== null) {
      out.push(key);
      key = MarkovMachine.choice(this.chains.get(key));
    }
    return out.join(" ");
  }
}

fs.readFile('eggs.txt', 'utf8', (err, data) => {
  if (err) {
    console.log("ERROR:", err);
    process.kill(1)
  }
  let mm = new MarkovMachine(data);
  out = mm.makeText();
})

module.exports = MarkovMachine
let mm = new MarkovMachine("the cat in the hat");
mm.makeText();