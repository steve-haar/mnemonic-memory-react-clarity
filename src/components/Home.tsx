import { KeyboardEvent, useEffect } from "react";
import { CdsBadge } from "@cds/react/badge";
import { CdsButton } from "@cds/react/button";
import { CdsTag } from "@cds/react/tag";
import { CdsTextarea } from "@cds/react/textarea";
import { CdsControlMessage } from "@cds/react/forms";
import { useDispatch, useSelector } from "react-redux";
import {
  addMnemonicWord,
  AppState,
  changeDigits,
  clearChosenMnemonicWords,
  initialize,
  removeMnemonicWord,
  solveRemainingDigits,
} from "./../redux";

function Home() {
  const dispatch = useDispatch();
  const state = useSelector<AppState, AppState>((state) => state);

  useEffect(() => {
    function prefill() {
      if (!state.digits) {
        dispatch(
          changeDigits(
            "1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679"
          )
        );

        const prefill = [
          { word: "turtle", digits: "1415" },
          { word: "banjo", digits: "926" },
          { word: "lime", digits: "35" },
          { word: "lava", digits: "58" },
        ];

        for (let i = 0; i < prefill.length; i++) {
          dispatch(addMnemonicWord(prefill[i]));
        }
      }
    }

    initialize().then(prefill);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onInputKeyPress(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.which < 48 || event.which > 57) {
      event.preventDefault();
    }
  }

  return (
    <div className="home-page">
      <h1 cds-text="display">Mnemonic Major System Calculator</h1>

      <p cds-text="message" className="margin-top">
        Enter in a number to convert to words using the{" "}
        <a href="/about">mnemonic major system</a>. We've prefilled the input
        with the first 100 digits of pie to get you started.
      </p>

      <div className="margin-top">
        <CdsTextarea>
          <label>digits</label>
          <textarea
            onChange={(e) => dispatch(changeDigits(e.target.value))}
            onKeyPress={onInputKeyPress}
            value={state.digits}
          ></textarea>
          <CdsControlMessage>message text</CdsControlMessage>
        </CdsTextarea>

        <div cds-layout="horizontal gap:sm" className="margin-top">
          <CdsButton onClick={() => dispatch(solveRemainingDigits())}>
            solve
          </CdsButton>
          <CdsButton
            onClick={() => dispatch(clearChosenMnemonicWords())}
            action="outline"
          >
            clear
          </CdsButton>
        </div>
      </div>

      <div className="margin-top">
        <h2 className="digits">
          <span className="chosen-digits">
            {state.digits.slice(0, state.chosenDigitsLength)}
          </span>
          <span>{state.digits.slice(state.chosenDigitsLength)}</span>
          <span>
            &nbsp;({state.chosenDigitsLength}/{state.digits.length})
          </span>
        </h2>

        {state.chosenMnemonicWords.map((mnemonicWord) => {
          return (
            <CdsTag
              key={`${mnemonicWord.word}-${mnemonicWord.digits}`}
              onClick={() => dispatch(removeMnemonicWord(mnemonicWord))}
              status="success"
            >
              {mnemonicWord.word}
              <CdsBadge aria-label="digits" status="info">
                {mnemonicWord.digits.length}
              </CdsBadge>
            </CdsTag>
          );
        })}

        <div>({state.chosenMnemonicWords.length} words)</div>
      </div>

      <div className="margin-top">
        {state.potentialMnemonicWords.map((mnemonicWord) => {
          return (
            <CdsTag
              key={`${mnemonicWord.word}-${mnemonicWord.digits}`}
              onClick={() => dispatch(addMnemonicWord(mnemonicWord))}
              status="info"
            >
              {mnemonicWord.word}
              <CdsBadge aria-label="digits" status="info">
                {mnemonicWord.digits.length}
              </CdsBadge>
            </CdsTag>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
