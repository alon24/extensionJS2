import { useEffect, useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function Popup() {
  const [count, setCount] = useState(0);

  const port = useMemo(() => {
    return chrome.runtime.connect({ name: "knockknock" });
  }, []);

  function highlightHandler(e) {
    // get the highlighted text
    var text = document.getSelection();
    // check if anything is actually highlighted
    if (text !== "") {
      // we've got a highlight, now do your stuff here
      port.postMessage({ highlighted: text });
    }
  }

  useEffect(() => {
    document.onmouseup = highlightHandler;

    port.onMessage.addListener(function (msg) {
      if (msg.question === "Who's there?")
        port.postMessage({ answer: "Madame" });
      else if (msg.question === "Madame who?")
        port.postMessage({ answer: "Madame... Bovary" });
    });
  }, []);

  return (
    <div className="App">
      <h1>ILAN contendddt</h1>
    </div>
  );
}

export default Popup;
