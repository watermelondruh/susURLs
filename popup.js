'use strict';

var url = "www.google.com";

function parse(data) {
    var parser = new DOMParser();
    var html = parser.parseFromString(data, "text/html");
    return html.getElementById("output").lastChild.innerHTML;
}

function handleClick() {

    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
        function(tabs) {
           url = tabs[0].url;
           sessionStorage.setItem("url", url);
        }
    );

    let urlsrc = document.getElementById("urlsrc");
    sessionStorage.setItem("urlsrc", urlsrc.value);

    if (urlsrc && urlsrc.value === "ShadyURL") {
        if (sessionStorage.getItem("shadyurl_clicked"))
            return false;

        fetch('https://cors-anywhere.herokuapp.com/http://www.shadyURL.com/create.php?', {
            method: 'POST',
            headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
            "Referer": "https://www.google.com/",
            "X-Requested-With": "XMLHttpRequest" },
            body: "myUrl={url}"
        })
        .then(response => response.text())
        .then((resdata) => {
            console.log(resdata);
            resdata = parse(resdata);
            sessionStorage.setItem("url", resdata);
            document.getElementById("link").innerHTML = resdata;
        })
        .catch((err) => {
            console.log(err);
        });

        sessionStorage.setItem("verylegit_clicked", true);
    }

    else {
        if (sessionStorage.getItem("verylegit_clicked"))
            return false;

        fetch('https://verylegit.link/sketchify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
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

