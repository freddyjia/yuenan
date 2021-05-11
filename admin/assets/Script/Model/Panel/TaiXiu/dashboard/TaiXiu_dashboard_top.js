
var helper = require('Helper');

cc.Class({
	extends: cc.Component,

	properties: {
		username: cc.Label,
		profitTX: cc.Label,
		profitCL: cc.Label,
		tWin:     cc.Label,
		tLost:    cc.Label,
		cWin:     cc.Label,
		cLost:    cc.Label,
	},
	setData: function(data) {
		this.username.string = data.name;
		this.profitTX.string = (data.profitTX < 0 ? '-' : '+') + helper.numberWithCommas(Math.abs(data.profitTX));
		this.profitCL.string = (data.profitCL < 0 ? '-' : '+') + helper.numberWithCommas(Math.abs(data.profitCL));
		this.tWin.string     = helper.numberWithCommas(data.tWin);
		this.tLost.string    = helper.numberWithCommas(data.tLost);
		this.cWin.string     = helper.numberWithCommas(data.cWin);
		this.cLost.string    = helper.numberWithCommas(data.cLost);
	},
});
