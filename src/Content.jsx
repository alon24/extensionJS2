import { useEffect, useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./Popup.css";

function Popup() {
  const [count, setCount] = useState(0);

  const port = useMemo(() => {
    const port = chrome.runtime.connect({ name: "knockknock" });
    port.onMessage.addListener(function (msg) {
      if (msg.question === "Who's there?")
        port.postMessage({ answer: "Madame" });
      else if (msg.question === "Madame who?")
        port.postMessage({ answer: "Madame... Bovary" });
    });
    return port;
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
  }, []);

  return <div className="App"></div>;
}

export default Popup;
