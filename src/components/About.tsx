import React from "react";

function About() {
  return (
    <div className="about-page">
      <h1 cds-text="display">Mnemonic Major System</h1>

      <p cds-text="message" className="margin-top">
        The{" "}
        <a href="https://en.wikipedia.org/wiki/Mnemonic_major_system">
          mnemonic major system
        </a>{" "}
        is a mnemonic technique used to aid in memorizing numbers. The system
        works by converting numbers into consonants, then into words by adding
        vowels. The system works on the principle that images can be remembered
        more easily than numbers.
      </p>

      <table className="margin-top">
        <thead>
          <tr>
            <th>Number</th>
            <th>Sounds</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0</td>
            <td>s, soft c, z, x (in xylophone)</td>
          </tr>
          <tr>
            <td>1</td>
            <td>t, d , th</td>
          </tr>
          <tr>
            <td>2</td>
            <td>n, ng</td>
          </tr>
          <tr>
            <td>3</td>
            <td>m</td>
          </tr>
          <tr>
            <td>4</td>
            <td>r, l (as sounded in colonel)</td>
          </tr>
          <tr>
            <td>5</td>
            <td>l</td>
          </tr>
          <tr>
            <td>6</td>
            <td>
              ch (in cheese and chef), j, soft g, sh, c (as sounded in cello and
              special), cz (as sounded in Czech), s (as sounded in tissue and
              vision), sc (as sounded in fascist), sch (as sounded in schwa and
              eschew), t (as sounded in ration and equation), tsch (in putsch),
              z (in seizure)
            </td>
          </tr>
          <tr>
            <td>7</td>
            <td>k, hard c, q, hard g, ch (as sounded in loch),</td>
          </tr>
          <tr>
            <td>8</td>
            <td>f, ph (in phone), v, gh (as sounded in laugh)</td>
          </tr>
          <tr>
            <td>9</td>
            <td>p, b</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default About;
