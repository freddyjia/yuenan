
var helper = require('Helper');

cc.Class({
    extends: cc.Component,

    properties: {
        username: cc.Label,
        redPlay:  cc.Label,
        redWin:   cc.Label,
        redLost:  cc.Label,
        redLai:   cc.Label,
        LastTime: cc.Label,
        LastBet:  cc.Label,
    },
    setData: function(data) {
        this.username.string = void 0 !== data.name ? data.name : "";
        this.redPlay.string  = helper.numberWithCommas(data.bet);
        this.redWin.string   = helper.numberWithCommas(data.win);
        this.redLost.string  = helper.numberWithCommas(data.lost);
        this.redLai.string   = (data.profit < 0 ? '-' : '+') + helper.numberWithCommas(Math.abs(data.profit));
        this.LastTime.string = void 0 !== data.t ? helper.getStringDateByTime(data.t) : "";
        this.LastBet.string  = void 0 !== data.b ? helper.numberWithCommas(data.b) : "";
    },
});
