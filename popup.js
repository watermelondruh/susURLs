'use strict';

var url = "www.google.com";

function handleClick() {

    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
        function(tabs) {
           url = tabs[0].url;
           sessionStorage.setItem("url", url);
        }
    );

    if (sessionStorage.getItem("verylegit_clicked"))
        return false;
    
    console.log(url);

    fetch('https://verylegit.link/sketchify', {
        method: 'POST',
        headers: { 'Content-Length': 20, 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
        body: "long_url="+url
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

    return false;
}

window.onload = function () {
    document.getElementById("button").onclick = handleClick;
    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
        function(tabs) {
           url = tabs[0].url;
           sessionStorage.setItem("url", url);
        }
    );
    document.getElementById("link").innerHTML = sessionStorage.getItem("url");
};

