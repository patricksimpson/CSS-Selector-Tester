chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.executeScript(null, { file: "jquery-1.9.1.js" });
    chrome.tabs.executeScript(null, { file: "jquery-ui-1.10.2.custom.min.js" });
    chrome.tabs.executeScript(null, { file: "nScript.js" });
});
