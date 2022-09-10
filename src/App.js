import React, {useState, useEffect, useRef} from "react";
import styles from "./styles.css";

const App = () => {
  const startTimer = 60;

  const [textStore, setTextStore] = useState("");
  const [startG,setStartG] = useState(false);
  const [countDown, setCountDown] = useState(startTimer);
  const [wordCount, setWordCount] = useState(0);
  const textBoxRef = useRef(null);

  useEffect(() => {
    if(startG && countDown > 0) {
        setTimeout(() => {
            setCountDown(time => time - 1)
        }, 1000)
    } else if(countDown === 0) {
        setStartG(false)
        setWordCount(count(textStore));
    }
}, [countDown, startG]); // as the second parameter useEffect will watch for these to states if they changes then the useeffect will run.//

  function handleText(event){
    const {value} = event.target 
    setTextStore(value)
    };
   function count(text){
        const arr = textStore.trim().split(' '); //using trim() in order to avoid empty spaces to be counted//() =>console.log(count(textStore))
        return arr.filter(word => word !== "").length;
      }
      function startClock() {
        setStartG(true);
        setCountDown(startTimer);
        setTextStore("");
        textBoxRef.current.disabled = false
        textBoxRef.current.focus();
    }

    return(
        <React.Fragment>
        <h1>Typing Speed Test</h1>
        <textarea ref={textBoxRef} onChange={handleText} value={textStore} disabled={!startG}/>
        <h4>Time remaining:{countDown}</h4>
        <button onClick={startClock} disabled={startG}>Start</button>  
        <h1>Word count:{wordCount}</h1>
        </React.Fragment>
    );
}

export default App;