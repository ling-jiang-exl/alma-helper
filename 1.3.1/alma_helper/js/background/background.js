function defaultOptions(details) {
  if (details.reason == "install") {
    let defaultRemoteFields = ["SearchExternalFormView.isbn"];
    chrome.storage.local.set({ "remoteFields": defaultRemoteFields });
  }
}

chrome.runtime.onInstalled.addListener(defaultOptions);
