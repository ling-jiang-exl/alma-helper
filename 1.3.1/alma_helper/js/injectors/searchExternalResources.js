var searchForm = getSearchExternalForm(document);
if (searchForm) {
    processSearchFormFields(searchForm);
}

function getSearchExternalForm(htmlDocument) {
    let searchForm = htmlDocument.getElementById("SearchExternalForm");
    if (searchForm == null) {
        let iframes = htmlDocument.getElementsByTagName("iframe");
        if (iframes != null && iframes.length > 0) {
            for (let i = 0; i < iframes.length; ++i) {
                try {
                    let iframeDocument = iframes[i].contentDocument || iframes[i].contentWindow.document;
                    let form = getSearchExternalForm(iframeDocument);
                    if (form != null) {
                        return form;
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
    return searchForm;
}

function processSearchFormFields(searchForm) {
  chrome.storage.local.get("remoteFields", function(items) {
      let remoteFields = items["remoteFields"];
      if (remoteFields) {
          var fieldElems = searchForm.getElementsByClassName("gwt-TextBox");
          for (let i = 0; i < fieldElems.length; ++i) {
              if (remoteFields.indexOf(fieldElems[i].id) == -1) {
                  // If user did not select this field in the addon settings page,
                  // then we clear the field's value in the search external resources form.
                  fieldElems[i].value = "";
                  // comment next line out if you would not like hiding the not used fields
                  fieldElems[i].parentElement.parentElement.style.display = "none";
              }
          }
      }
  });
}
