function saveOptions(e) {
    let selectedFields = [];
    let fieldElems = document.querySelectorAll("#settings .remote-field");
    for (let i = 0; i < fieldElems.length; ++i) {
        if (fieldElems[i].checked) {
            selectedFields.push(fieldElems[i].id);
        }
    }
    chrome.storage.local.set({ "remoteFields": selectedFields });
    alert("Refresh page to apply change!");
    e.preventDefault();
}

function restoreOptions() {
    chrome.storage.local.get("remoteFields", function(items) {
        let remoteFields = items["remoteFields"];
        if (remoteFields && remoteFields.length > 0) {
            for (let i = 0; i < remoteFields.length; ++i) {
                let field = document.getElementById(remoteFields[i]);
                if (field != null) {
                    field.checked = true;
                }
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("settings").addEventListener("submit", saveOptions);
