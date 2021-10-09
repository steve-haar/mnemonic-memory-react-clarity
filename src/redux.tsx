import { createStore } from "redux";
import {
  MnemonicWord,
  MnemonicWordFinderService,
} from "./services/mnemonic-word-finder.service";

enum ActionType {
  AddMnemonicWord,
  RemoveMnemonicWord,
  ChangeDigits,
  ClearChosenMnemonicWords,
  SolveRemainingDigits,
}

const mnemonicWordFinderService = new MnemonicWordFinderService();

export const initialize = () => mnemonicWordFinderService.initialize();

export interface AppState {
  chosenDigitsLength: number;
  chosenMnemonicWords: MnemonicWord[];
  potentialMnemonicWords: MnemonicWord[];
  digits: string;
}

export function configureStore() {
  return createStore(reducer, initialState);
}

export function addMnemonicWord(mnemonicWord: MnemonicWord) {
  return {
    type: ActionType.AddMnemonicWord,
    payload: {
      mnemonicWord,
    },
  } as const;
}

export function removeMnemonicWord(mnemonicWord: MnemonicWord) {
  return {
    type: ActionType.RemoveMnemonicWord,
    payload: {
      mnemonicWord,
    },
  } as const;
}

export function changeDigits(digits: string) {
  return {
    type: ActionType.ChangeDigits,
    payload: {
      digits,
    },
  } as const;
}

export function clearChosenMnemonicWords() {
  return {
    type: ActionType.ClearChosenMnemonicWords,
  } as const;
}

export function solveRemainingDigits() {
  return {
    type: ActionType.SolveRemainingDigits,
  } as const;
}

const initialState: AppState = {
  chosenDigitsLength: 0,
  chosenMnemonicWords: [],
  potentialMnemonicWords: [],
  digits: "",
};

type Actions =
  | ReturnType<typeof addMnemonicWord>
  | ReturnType<typeof removeMnemonicWord>
  | ReturnType<typeof changeDigits>
  | ReturnType<typeof clearChosenMnemonicWords>
  | ReturnType<typeof solveRemainingDigits>;

function reducer(state: AppState | undefined, action: Actions) {
  const safeState: AppState = state || initialState;

  switch (action.type) {
    case ActionType.AddMnemonicWord: {
      const chosenMnemonicWords = [
        ...safeState.chosenMnemonicWords,
        action.payload.mnemonicWord,
      ];
      const chosenDigitsLength =
        countDigitsInMnemonicWords(chosenMnemonicWords);
      const potentialMnemonicWords = mnemonicWordFinderService.getWords(
        safeState.digits.substr(chosenDigitsLength)
      );

      const updatedState: AppState = {
        ...safeState,
        chosenMnemonicWords,
        chosenDigitsLength,
        potentialMnemonicWords,
      };

      return updatedState;
    }
    case ActionType.RemoveMnemonicWord: {
      const index = safeState.chosenMnemonicWords.indexOf(
        action.payload.mnemonicWord
      );
      const chosenMnemonicWords = safeState.chosenMnemonicWords.slice(0, index);
      const chosenDigitsLength =
        countDigitsInMnemonicWords(chosenMnemonicWords);
      const potentialMnemonicWords = mnemonicWordFinderService.getWords(
        safeState.digits.substr(chosenDigitsLength)
      );

      const updatedState: AppState = {
        ...safeState,
        chosenMnemonicWords,
        chosenDigitsLength,
        potentialMnemonicWords,
      };

      return updatedState;
    }
    case ActionType.ChangeDigits: {
      const digits = action.payload.digits;
      let chosenDigitsLength = 0;
      const invalidChosenWordIndex = safeState.chosenMnemonicWords.findIndex(
        (word) => (chosenDigitsLength += word.digits.length) > digits.length
      );
      const chosenMnemonicWords =
        invalidChosenWordIndex >= 0
          ? safeState.chosenMnemonicWords.slice(0, invalidChosenWordIndex)
          : safeState.chosenMnemonicWords;
      chosenDigitsLength = countDigitsInMnemonicWords(chosenMnemonicWords);
      const potentialMnemonicWords = mnemonicWordFinderService.getWords(
        digits.substr(chosenDigitsLength)
      );

      const updatedState: AppState = {
        digits,
        chosenMnemonicWords,
        chosenDigitsLength,
        potentialMnemonicWords,
      };

      return updatedState;
    }
    case ActionType.ClearChosenMnemonicWords: {
      const chosenMnemonicWords: MnemonicWord[] = [];
      const chosenDigitsLength =
        countDigitsInMnemonicWords(chosenMnemonicWords);
      const potentialMnemonicWords = mnemonicWordFinderService.getWords(
        safeState.digits.substr(chosenDigitsLength)
      );

      const updatedState: AppState = {
        ...safeState,
        chosenMnemonicWords,
        chosenDigitsLength,
        potentialMnemonicWords,
      };

      return updatedState;
    }
    case ActionType.SolveRemainingDigits: {
      let chosenMnemonicWords = [...safeState.chosenMnemonicWords];
      let chosenDigitsLength = safeState.chosenDigitsLength;

      while (chosenDigitsLength < safeState.digits.length) {
        const word = mnemonicWordFinderService.getWords(
          safeState.digits.substr(chosenDigitsLength)
        )[0];

        if (!word) {
          break;
        }

        chosenMnemonicWords.push(word);
        chosenDigitsLength = countDigitsInMnemonicWords(chosenMnemonicWords);
      }

      const potentialMnemonicWords = mnemonicWordFinderService.getWords(
        safeState.digits.substr(chosenDigitsLength)
      );

      const updatedState: AppState = {
        ...safeState,
        chosenMnemonicWords,
        chosenDigitsLength,
        potentialMnemonicWords,
      };

      return updatedState;
    }
    default:
      return neverReached(state as never);
  }
}

function countDigitsInMnemonicWords(mnemonicWords: MnemonicWord[]) {
  return mnemonicWords.reduce((sum, word) => sum + word.digits.length, 0);
}

function neverReached(state: never) {
  return state as AppState;
}
