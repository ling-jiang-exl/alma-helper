filters = [
    {
        "url": "/rep/mdeditor/marcEditorService",
        "file": "searchExternalResources.js"
    },
    {
        "url": "/rep/yards/yardsMarcEditorService",
        "file": "searchExternalResources.js"
    }
];

function inject(injector) {
    chrome.tabs.executeScript({
        file: "/js/injectors/" + injector,
        runAt: "document_idle"
    }, function() {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
        }
    });
}

function url_catcher(details) {
    let url = details.url;
    let regexp;
    for (let i = 0; i < filters.length; ++i) {
        regexp = new RegExp(filters[i].url, "i");
        if (url.match(regexp) != null) {
            inject(filters[i].file);
            break;
        }
    };
}

chrome.webRequest.onCompleted.addListener(
    url_catcher,
    {  // Filter
        urls: [
            "https://*.alma.exlibrisgroup.com/*",
            "https://*.alma.exlibrisgroup.com.cn/*"
        ]
    }
);
