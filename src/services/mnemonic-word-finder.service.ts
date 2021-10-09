export interface MnemonicWord {
  digits: string;
  word: string;
}

let mnemonicMap: { [key: string]: string[] } | undefined;

export class MnemonicWordFinderService {
  initialize() {
    if (mnemonicMap) {
      return Promise.resolve();
    }

    return fetch("/assets/mnemonic-map.json").then(
      response => response.json()
    ).then(
      data => { mnemonicMap = data; }
    );
  }

  getWords(digits: string, maxWords?: number) {
    const words: MnemonicWord[] = [];

    if (mnemonicMap) {
      for (let i = digits.length; i > 0; i--) {
        const subDigits = digits.substr(0, i);
        const wordsForSubDigits = mnemonicMap[subDigits] || [];
  
        for (let j = 0; j < wordsForSubDigits.length; j++) {
          words.push({ digits: subDigits, word: wordsForSubDigits[j] });

          if (words.length === maxWords) {
            return words;
          }
        }
      }
    }

    return words;
  }
}
