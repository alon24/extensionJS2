import { useEffect, useState, useMemo } from "react";
import { Linkedin } from "./components/linkedin.jsx";

export const ApplicationPage = () => {
  const [highlightedText, setHighlightedText] = useState("");
  const [pageData, setPageData] = useState({});

  function highlightHandler(t) {
    if (t !== "") {
      // we've got a highlight, now do your stuff here
      console.log("ilan", t);
      setHighlightedText(t);
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
      if (msg.highlighted) {
        highlightHandler(msg.highlighted);
      } else if (msg.webData) {
        setPageData(msg);
        console.log("got msg data");
      }
    });
  }, [port]);

  return (
    <div>
      <h1>I will do the work now</h1>
      <h3>message is: {highlightedText}</h3>
      {pageData?.type === "linkedin" && <Linkedin data={pageData.webData} />}
    </div>
  );
};
