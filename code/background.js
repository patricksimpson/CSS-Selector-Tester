chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.executeScript(null, { file: "jquery.js" });
    chrome.tabs.executeScript(null, { file: "nScript.js" });
});