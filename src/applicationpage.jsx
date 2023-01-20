import { useEffect, useState, useMemo } from "react";

export const ApplicationPage = () => {
  const [text, setText] = useState("");
  function highlightHandler(t) {
    if (t !== "") {
      // we've got a highlight, now do your stuff here
      console.log("ilan", t);
      setText(t);
    }
  }

  const port = useMemo(() => {
    const p = chrome.runtime.connect({ name: "extensionPage" });
    console.log("pop port=", p);
    return p;
  }, []);

  useEffect(() => {
    port.postMessage({ highlighted: "hello from new page" });

    port.onMessage.addListener(function (msg) {
      console.log("in app ", msg);
      if (msg.highlighted) {
        highlightHandler(msg.highlighted);
      }
    });
  }, [port]);

  return (
    <div>
      <h1>I will do the work now</h1>
      <h3>message is: {text}</h3>
    </div>
  );
};
