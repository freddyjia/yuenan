module.exports = function (med, data) {
    if (med == "post") {
        let url = data.url;
        let prams = data.prams;
        let success = function (response) {
            console.log(response)
        }
        let fail = function (err) {

        }
        let timeout = data.timeout;
        this.HttpPost(url, prams, success, fail, timeout)
    } else {
        this.HttpGET()
    }
}
HttpGET = function (url, successCallback, failCallback, timeout) {
    console.log("GET")

    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhr = new XMLHttpRequest();
    xhr.timeout = timeout;
    xhr.onreadystatechange = function () {
        // cc.error("xhr.readyState  " + xhr.readyState);
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 400) {
                var response = xhr.responseText;
                successCallback(response);
            }
            else {
                failCallback("err code: " + xhr.status + " err msg: " + xhr.statusText);
            }
        }
        // else if(xhr.readyState == 1)
        // {
        //     xhr.setRequestHeader("Access-Control-Allow-Origin","*");
        // }
    };
    xhr.open("GET", url, true);
    xhr.send();
}
HttpPost = function (url, postParm, successCallback, failCallback, timeout) {
    console.log("Post")
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhr = new XMLHttpRequest();
    console.log("Post")
    xhr.onreadystatechange = function () {
        // cc.error("Post xhr.readyState  " + xhr.readyState);
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 400) {
                var response = xhr.responseText;
                successCallback(response);
            }
            else {
                console.error("err code: " + xhr.status + " err msg: " + xhr.statusText + " xhr.responseText " + xhr.responseText);
                failCallback("网络请求错误");
            }
        }
    };
    xhr.open("POST", url, true);
    xhr.timeout = timeout;
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    let jsongStr = JSON.stringify(postParm);
    console.error("jsongStr " + jsongStr);

    // let bytes = new TextEncoder().encode(jsongStr);
    // xhr.send(bytes);
    xhr.send(jsongStr);
}

