import { useEffect, useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./Popup.css";

function Popup() {
  const [count, setCount] = useState(0);

  const port = useMemo(() => {
    const port = chrome.runtime.connect({ name: "content" });
    // port.postMessage({ msg: "hello" });
    port.onMessage.addListener((msg) => {
      if (msg.question === "listPeople") port.postMessage({ answer: "Madame" });
      else if (msg.question === "Madame who?")
        port.postMessage({ answer: "Madame... Bovary" });
    });
    return port;
  }, []);

  function highlightHandler(e) {
    // get the highlighted text
    var text = window.getSelection().toString();
    // var text = document
    //   .getSelection()
    //   .anchorNode.data.substr(document.getSelection().anchorOffset);
    // check if anything is actually highlighted
    if (text !== "") {
      // we've got a highlight, now do your stuff here
      port.postMessage({ highlighted: text });
    }
  }

  useEffect(() => {
    document.onmouseup = highlightHandler;
  }, [port]);

  return <div className="App"></div>;
}

export default Popup;
