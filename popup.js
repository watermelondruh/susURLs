'use strict';

//const { Session } = require("inspector");

let button = document.getElementById("button");
let urlsrc = document.getElementById("urlsrc");
let link = document.getElementById("link");
let url = "www.google.com";

function handleClick() {
    sessionStorage.setItem("urlsrc", urlsrc.value);
    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
        function(tabs) {
            url = tabs[0].url;
            sessionStorage.setItem("url", url);
        }
    );
    
    if (urlsrc != null && urlsrc.value === "ShadyURL") {
        console.log(url);
    }
    else {
        console.log(url);
    }

}


document.addEventListener('DOMContentLoaded', function() {
    button = document.getElementById("button");
    button.onclick = function f() {
        handleClick();
    }
    urlsrc = document.getElementById("urlsrc");
    urlsrc.value = sessionStorage.getItem("urlsrc");
    link = document.getElementById("link");
    link.innerHTML = sessionStorage.getItem("url");
});

