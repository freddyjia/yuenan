
var Helper = require('Helper');

cc.Class({
	extends: cc.Component,

	properties: {
		bg:     cc.Node,
		gd:     cc.Label,
		time:   cc.Label,
		nick:   cc.Label,
		bank:   cc.Label,
		money:  cc.Label,
		status: cc.Label,
	},
	init: function(i, data, obj){
		this.RedT = obj;
		this.data = data;
		this.bg.active = i%2;

		this.gd.string     = data.GD;
		this.time.string   = Helper.getStringDateByTime(data.time);
		this.nick.string   = data.nick;
		this.bank.string   = data.bank.toUpperCase();
		this.money.string  = Helper.numberWithCommas(data.money);
		this.status.string = data.status == 0 ? "Chờ duyệt" : (data.status == 1 ? "Thành công" : "Thất bại");
		this.status.node.color = data.status == 0 ? cc.color(45, 171, 255, 255) : (data.status == 1 ? cc.color(0, 255, 71, 255) : cc.color(255, 0, 0, 255));
	},
	onInfoClick: function(){
		this.RedT.item = this;
		cc.RedT.dialog.showBank(event, 'rut', this);
	},
});
