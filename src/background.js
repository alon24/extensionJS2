async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

let ports = {};
let extensionPort = null;
chrome.runtime.onConnect.addListener((port) => {
  if (port.name === "content" && !ports[port.sender.tab.id]) {
    ports[port.sender.tab.id] = port;
    port.onMessage.addListener(function (msg) {
      console.log(`in back, from`, port.sender.tab.id, msg);
      if (extensionPort) {
        extensionPort.postMessage(msg);
      }
      // if (msg.highlighted) {
      //
      // }
    });
  }

  if (port.name === "extensionPage" && !extensionPort) {
    extensionPort = { id: port.sender.tab.id, port };
    port.onMessage.addListener(function (msg) {
      console.log(`in extensionPage, from, ${port}`, msg);
      // if (msg.highlighted) {
      //   console.log(`in back, from, ${port.name}`, msg);
      // }
    });
  }
});

const src = chrome.runtime.getURL("./newPopup.html");
console.log(src);

//need to call script to open newPopupWindow
chrome.action.onClicked.addListener(async (tab) => {
  if (!extensionPort) {
    let newTab = await chrome.windows.create({
      url: src,
      width: 400,
      type: "popup",
    });
  }
});

// chrome.tabs.onRemoved.addListener((tabId, obj) => {
//   if (tabId === extentionPageId + 1) {
//     extentionPageId = null;
//   }
// });

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await getCurrentTab();
  if (extensionPort && activeInfo.tabId !== extensionPort?.id)
    extensionPort?.port?.postMessage({ action: "parseUsers" });
});

// function highlightHandler(e) {
//   // get the highlighted text
//   var text = document.getSelection();
//   // check if anything is actually highlighted
//   if (text !== "") {
//     // we've got a highlight, now do your stuff here
//     console.log(text);
//   }
// }

// chrome.runtime.onMessage.addListener(
//   // this is the message listener
//   function (request, sender, sendResponse) {
//     if (request.message === "messageSent") runThisFunction();
//   }
// );
// document.onmouseup = highlightHandler;
