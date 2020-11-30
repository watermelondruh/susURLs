'use strict';

var url = "www.google.com";

function copyLink() {
    var shadylink = document.getElementById("link").href;
    navigator.clipboard.writeText(shadylink).then(() => {
        sessionStorage.setItem("linkcopied", true);
    }), () => {
        console.log("Failed to copy link.");
    }
}

function getLink() {
    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
        function(tabs) {
           url = tabs[0].url;
           sessionStorage.setItem("url", url);
        }
    );

    if (sessionStorage.getItem("verylegit_clicked"))
        return false;

    fetch('https://verylegit.link/sketchify', {
        method: 'POST',
        headers: { 'Content-Length': 20, 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
        body: "long_url="+url
    })
    .then(response => response.text())
    .then((resdata) => {
        // display suspicious URL
        sessionStorage.setItem("url", resdata);
        document.getElementById("link").href = resdata;
        document.getElementById("link").innerHTML = resdata;
        // add button for copying link
        var copylink = document.createElement("BUTTON");
        copylink.innerHTML = "COPY LINK!"
        copylink.onclick = copyLink;
        document.getElementById("linkdiv").appendChild(copylink);
    })
    .catch((err) => {
        console.log(err);
    });
    
    sessionStorage.setItem("verylegit_clicked", true);
    sessionStorage.setItem("linkcopied", false);

    return false;
}

window.onload = function () {
    document.getElementById("getlink").onclick = getLink;
    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
        function(tabs) {
           url = tabs[0].url;
           sessionStorage.setItem("url", url);
        }
    );
    document.getElementById("link").href = sessionStorage.getItem("url");
    document.getElementById("link").innerHTML = sessionStorage.getItem("url");
    if (sessionStorage.getItem("linkcopied")) {
        var copiedtext = document.createElement("P");
        copiedtext.innerHTML = "Link successfully copied!"
        document.getElementById("linkdiv").appendChild(copiedtext);
    }
};

