import parse from "html-react-parser";
import styles from "./custom.module.css";
import { useState, useRef } from "react";
function App() {
  const reff = useRef([]);
  const [disable, setDisable] = useState(false);
  const [show, setShow] = useState(false);
  const [correct, setCorrect] = useState(false);
  const data = {
    operation: "addition",
    type: "matchobjectsvertical",
    rows: "3",
    cols: "1",
    questionName:
      "\u003cdiv\u003eEach digit in the following equation has been replaced with a letter.\u0026nbsp;\u003c/div\u003e\u003cdiv\u003eThe same letter always represents the same number.\u0026nbsp;\u003c/div\u003e\u003cdiv\u003eCan you work out which digits have been replaced with which letters?\u003c/div\u003e\u003cdiv\u003e\u0026nbsp; KK + LL + MM = LMK\u0026nbsp;\u003c/div\u003e",
    questionContent: [
      [
        {
          row: 0,
          col: 0,
          imgvalue:
            '\u003cspan style="text-align: start;"\u003eK\u003c/span\u003e',
          numvalue: "8",
          isMissed: "true",
        },
      ],
      [
        {
          row: 1,
          col: 0,
          imgvalue:
            '\u003cspan style="text-align: start;"\u003eL\u003c/span\u003e',
          numvalue: "1",
          isMissed: "true",
        },
      ],
      [
        {
          row: 2,
          col: 0,
          imgvalue:
            '\u003cspan style="text-align: start;"\u003eM\u003c/span\u003e',
          numvalue: "9",
          isMissed: "true",
        },
      ],
    ],
    solution: {
      model: [{ val: "K = 8, L = 1 and M = 9" }],
      sidebyside: [],
      srows: null,
      scols: null,
    },
    choices: ["8", "1", "9"],
    choiceType: "keying",
    choiceCount: 3,
  };
  // let arr = [];
  // for (let i = 0; i < Number(data.rows); i++) {
  //   let temp = [];
  //   for (let j = 0; j < Number(data.cols); j++)
  //     temp.push(
  //       <div>
  //         <input></input>
  //       </div>
  //     );
  //   arr.push(temp);
  // }

  const handleSubmit = () => {
    let flag = 0;

    for (let i = 0; i < reff.current.length; i++) {
      if (reff.current[i].value === "") {
        alert("Please fill all the values");
        return;
      }
    }
    for (let i = 0; i < reff.current.length; i++) {
      if (
        Number(data.questionContent[i][0].numvalue) !=
        Number(reff.current[i].value)
      ) {
        flag = 1;
        break;
      }
    }
    if (flag == 0) {
      setDisable(true);
      setShow(true);
      setCorrect(true);
    } else {
      setDisable(true);
      setShow(true);
      setCorrect(false);
    }
  };
  return (
    <div className={styles.height}>
      <div className={styles.color}>{parse(data.questionName)}</div>
      <div className={styles.column}>
        {data.questionContent.map((e, i) => (
          <div className={disable ? styles.ind1 : styles.ind}>
            <div className={styles.color1}>{parse(e[0].imgvalue)}</div>
            <input type="text" ref={(el) => (reff.current[i] = el)}></input>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Click</button>
      {show ? (
        correct ? (
          <div className={styles.green}>Correct</div>
        ) : (
          <div className={styles.red}>Incorrect</div>
        )
      ) : null}
    </div>
  );
}

export default App;
