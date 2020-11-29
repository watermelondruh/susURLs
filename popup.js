'use strict';

//const { Session } = require("inspector");

function handleClick() {
    //sessionStorage.setItem("urlsrc", urlsrc.value);
    
    const data = {'long_url' : 'twitter.com'};
    const response = fetch('https://verylegit.link/sketchify', {
        method: 'POST',
        headers: { 
            'Content-Length': 20,
            'Content-Type': 'application/x-www-form-urlencoded' },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then((resdata) => {
        alert(resdata, "bruh");
    })
    .catch((err) => {
        //sessionStorage.setItem("url", err);
        console.log(err);
    });
}

window.onload = function () {
    document.getElementById("button").onclick = handleClick;
    // display current link
    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
        function(tabs) {
            url = tabs[0].url;
            //sessionStorage.setItem("url", url);
            document.getElementById("link").innerHTML = url;
        }
    );
};

