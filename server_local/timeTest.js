var request = require('request');
var crypto = require('crypto');
var fixed2 = function (number) {
    return (+number).toFixed(2) - 0;
}
let MerInfo = {
    payUrl: "http://47.242.85.7:9090/sms/batch/v2",
}
let obj = {
    "appkey": "f5400z",
    "appsecret": "abc123",
    "phone": "0066629528632",
    "msg": "三生三世",
    "appcode": "1000",
}
let objkey = Object.keys(obj);
let data = '';
for (let i = 0; i < objkey.length; i++) {
    data += objkey[i] + '=' + obj[objkey[i]] + "&"
}
data = data.substr(0, data.length - 1);
console.log('data====', data)
console.log('reqData----->', obj)

request.get("http://47.242.85.7:9090/sms/batch/v2?appkey=f5400z&appsecret=abc123&phone=00639279012888&msg=%E4%B8%89%E7%94%9F%E4%B8%89%E4%B8%96&appcode=1000",function(err,data){
    console.log(data.body)
})
