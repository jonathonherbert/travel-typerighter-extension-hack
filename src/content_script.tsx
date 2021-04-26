import ReactDOM from "react-dom";
import React from "react";
import App from "./mountOverlay";

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.color) {
    console.log("Receive color = " + msg.color);
    document.body.style.backgroundColor = msg.color;
    sendResponse("Change color to " + msg.color);
  } else {
    sendResponse("Color message is none.");
  }
});

const extensionRoot = document.createElement("div");
document.body.appendChild(extensionRoot);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  extensionRoot
);
