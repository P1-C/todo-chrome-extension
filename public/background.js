const openPanels = {};

chrome.action.onClicked.addListener(function (tab) {
  const panelURL = chrome.runtime.getURL("panel.html");

  if (openPanels[panelURL]) {
    chrome.windows.update(openPanels[panelURL], { focused: true });
  } else {
    chrome.windows.create({
      url: panelURL,
      type: "panel",
      width: 1000,
      height: 800,
    }, function (window) {
      openPanels[panelURL] = window.id;
    });
  }
});

chrome.windows.onRemoved.addListener(function (windowId) {
  for (const [url, id] of Object.entries(openPanels)) {
    if (id === windowId) {
      delete openPanels[url];
      break;
    }
  }
});