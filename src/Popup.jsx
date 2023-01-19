import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function Popup() {
  const [count, setCount] = useState(0);

  function highlightHandler(e) {
    // get the highlighted text
    var text = document.getSelection();
    // check if anything is actually highlighted
    if (text !== "") {
      // we've got a highlight, now do your stuff here
      console.log(text);
    }
  }

  useEffect(() => {
    document.onmouseup = highlightHandler;

    // const port = chrome.runtime.connect({ name: "knockknock" });
    // port.postMessage({ joke: "Knock knock" });
    // port.onMessage.addListener(function (msg) {
    //   if (msg.question === "Who's there?")
    //     port.postMessage({ answer: "Madame" });
    //   else if (msg.question === "Madame who?")
    //     port.postMessage({ answer: "Madame... Bovary" });
    // });
  }, []);

  return (
    <div className="App">
      <h1>ilan</h1>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img
            src={chrome.runtime.getURL("/vite.svg")}
            className="logo"
            alt="Vite logo"
          />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img
            src={chrome.runtime.getURL(reactLogo)}
            className="logo react"
            alt="React logo"
          />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/Popup.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default Popup;
