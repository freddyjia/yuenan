
var Helper = require('Helper');

cc.Class({
    extends: cc.Component,

    properties: {
        time:  cc.Label,
        uname: cc.Label,
		cuoc:  cc.Label,
    },
    setData: function(data) {
    	this.time.string  = Helper.getStringHourByTime(data.time);
    	this.uname.string = data.name;
    	this.cuoc.string  = Helper.numberWithCommas(data.bet);
    },
});
