// import html from "/src/newPopup.html?raw";

chrome.runtime.onConnect.addListener(function (port) {
  // console.assert(port.name === "knockknock");
  // port.onMessage.addListener(function (msg) {
  //   console.log(msg);
  //   if (msg.joke === "Knock knock")
  //     port.postMessage({ question: "Who's there?" });
  //   else if (msg.answer === "Madame")
  //     port.postMessage({ question: "Madame who?" });
  //   else if (msg.answer === "Madame... Bovary")
  //     port.postMessage({ question: "I don't get it." });
  // });
});

const src = chrome.runtime.getURL("./newPopup.html");
console.log(src);

//need to call script to open newPopupWindow
chrome.action.onClicked.addListener(function (tab) {
  console.log("icon clicked");
  chrome.action.onClicked.addListener((tab) => {
    chrome.windows.create({
      url: src,
      width: 200,
      type: "popup",
    });
  });
});
