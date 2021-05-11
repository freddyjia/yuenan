
function isEmpty(str) {
	return (!str || 0 === str.length)
}
function checkPhoneValid(phone) {
	return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phone)
}
function nFormatter(t, e) {
	for (var i = [{
		value: 1e18,
		symbol: "E"
	}, {
		value: 1e15,
		symbol: "P"
	}, {
		value: 1e12,
		symbol: "T"
	}, {
		value: 1e9,
		symbol: "G"
	}, {
		value: 1e6,
		symbol: "M"
	}, {
		value: 1e3,
		symbol: "k"
	}], o = /\.0+$|(\.[0-9]*[1-9])0+$/, n = 0; n < i.length; n++)
		if (t >= i[n].value)
			return (t / i[n].value).toFixed(e).replace(o, "$1") + i[n].symbol;
	return t.toFixed(e).replace(o, "$1")
}
function numberWithCommas(number) {
	if (number) {
		var result = (number = parseInt(number)).toString().split(".");
		return result[0] = result[0].replace(/\B(?=(\d{3})+(?!\d))/g, "."),
		result.join(".")
	}
	return "0"
}
function getOnlyNumberInString(t) {
	var e = t.match(/\d+/g);
	return e ? e.join("") : ""
}

function numberToTime(t) {
	t < 0 && (t = 0),
	t = parseInt(t);
	var e = parseInt(t / 60)
	, i = t % 60;
	return e < 10 && (e = "0" + e),
	i < 10 && (i = "0" + i),
	e + ":" + i
}
function numberPad(number, length) {
	var str = '' + number
	while(str.length < length)
		str = '0' + str
	return str
}

function inputNumber(obj){
	var onShift = false
	obj.addEventListener('keydown', function(e){if (e.keyCode === 16) {e.preventDefault();onShift = true;}});
	obj.addEventListener('keyup',   function(e){if (e.keyCode === 16) {e.preventDefault();onShift = false;}});
	obj.addEventListener('keydown', function(e){
		if (!onShift && ((e.keyCode >= 48 && e.keyCode <= 57)  ||
			(e.keyCode >= 96 && e.keyCode <= 105) ||
			(e.keyCode >= 37 && e.keyCode <= 40) ||
			e.keyCode === 107 ||
			e.keyCode === 109 ||
			e.keyCode === 189 ||
			e.keyCode === 8 ||
			e.keyCode === 13)) {
		} else {
			e.preventDefault();
		}
	});
}
function numberTo(obj, start, end, duration, currency = false){
	clearInterval(obj.timer)
	var range = end - start;
	var minTimer = 50;
	var stepTime = Math.abs(Math.floor(duration / range));
	stepTime = Math.max(stepTime, minTimer);
	var startTime = new Date().getTime();
	var endTime = startTime + duration;

	obj.timer = setInterval(function(){
		var now = new Date().getTime();
		var remaining = Math.max((endTime - now) / duration, 0);
		var value = Math.round(end - (remaining * range));
		obj.string = currency === true ? numberWithCommas(value) : value;
		if (value == end) {
			clearInterval(obj.timer);
		}
	}, stepTime);
}
function getStringDateByTime(t) {
	var e = new Date(t)
	  , i = e.getHours()
	  , o = e.getMinutes()
	  , n = e.getDate()
	  , s = e.getMonth() + 1;
	return i < 10 && (i = "0" + i),
	o < 10 && (o = "0" + o),
	n < 10 && (n = "0" + n),
	s < 10 && (s = "0" + s),
	i + ":" + o + " " + n + "/" + s + "/" + e.getFullYear()
}
function getDateByTime(t) {
	var e = new Date(t);
	return e.getDate() + "/" + (e.getMonth() + 1) + "/" + e.getFullYear()
}
function getStringHourByTime(t) {
	var e = new Date(t)
	  , i = e.getHours()
	  , o = e.getMinutes()
	  , n = e.getSeconds();
	return i < 10 && (i = "0" + i),
	o < 10 && (o = "0" + o),
	n < 10 && (n = "0" + n),
	i + ":" + o + ":" + n
}

function anPhanTram(bet, an){
	return bet*an-Math.ceil(bet*an/100);
}
function truChietKhau(bet){
	return bet-Math.ceil(bet*2/100);
}

module.exports = {
	checkPhoneValid:       checkPhoneValid,
	nFormatter:            nFormatter,
	numberWithCommas:      numberWithCommas,
	isEmpty:               isEmpty,
	getOnlyNumberInString: getOnlyNumberInString,
	numberPad:             numberPad,
	inputNumber:           inputNumber,
	anPhanTram:            anPhanTram,
	truChietKhau:          truChietKhau,
	numberTo:              numberTo,
	getStringDateByTime:   getStringDateByTime,
	getDateByTime:         getDateByTime,
	getStringHourByTime:   getStringHourByTime,
}
