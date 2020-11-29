'use strict';
//const { Session } = require("inspector");
var url = "www.google.com";

function handleClick() {

    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
        function(tabs) {
           url = tabs[0].url;
           sessionStorage.setItem("url", url);
        }
    );

    const urlsrc = document.getElementById("urlsrc");
    sessionStorage.setItem("urlsrc", urlsrc.value);

    if (urlsrc && urlsrc.value === "ShadyURL") {
        console.log(url);
    }
    else {
        if (sessionStorage.getItem("verylegit_clicked"))
            return false;

        fetch('https://verylegit.link/sketchify', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded' },
            body: "long_url={url}"
        })
        .then(response => response.text())
        .then((resdata) => {
            sessionStorage.setItem("url", resdata);
            document.getElementById("link").innerHTML = resdata;
        })
        .catch((err) => {
            console.log(err);
        });
        sessionStorage.setItem("verylegit_clicked", true);
    }
    return false;
}

window.onload = function () {
    document.getElementById("button").onclick = handleClick;
    // display current link
    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
        function(tabs) {
           url = tabs[0].url;
           sessionStorage.setItem("url", url);
        }
    );
    document.getElementById("link").innerHTML = sessionStorage.getItem("url");
};

