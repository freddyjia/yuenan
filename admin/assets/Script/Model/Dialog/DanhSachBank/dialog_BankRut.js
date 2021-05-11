
var Helper = require('Helper');

cc.Class({
	extends: cc.Component,

	properties: {
		labelGD:     cc.Label,
		labelTime:   cc.Label,
		labelRut:    cc.Label,
		labelBank:   cc.Label,
		labelNumber: cc.Label,
		labelName:   cc.Label,
		labelBranch: cc.Label,
		labelSoGD:   cc.Label,
		labelNick:   cc.Label,
		labelStatus: cc.Label,
		info:        cc.EditBox,
		status:      '',
	},
	onEnable: function () {
		this.linkObj = this.node.parent.idT;
		this.setData(this.linkObj.data);
	},
	setData: function(data){
		this.labelGD.string     = data.GD;
		this.labelTime.string   = Helper.getStringDateByTime(data.time);
		this.labelRut.string    = Helper.numberWithCommas(data.money);
		this.labelBank.string   = data.bank.toUpperCase();
		this.labelNumber.string = data.number;
		this.labelName.string   = data.name;
		this.labelBranch.string = data.branch;
		this.labelSoGD.string   = data.info;
		this.labelNick.string   = data.nick;
		this.labelStatus.string = data.status == 0 ? "Chờ duyệt" : (data.status == 1 ? "Thành công" : "Thất bại");
		this.labelStatus.node.color = data.status == 0 ? cc.color(45, 171, 255, 255) : (data.status == 1 ? cc.color(0, 255, 71, 255) : cc.color(255, 0, 0, 255));
	},
	changerStatus: function(event, data) {
		this.status = data;
	},
	onUpdateClick: function(){
		var update = {id:this.linkObj.data._id, status: this.status};
		if (!!this.info.string) {
			update.info = this.info.string;
		}
		cc.RedT.send({shop:{bank:{updateRut:update}}});
	},
	onData: function(data){
		if (!!data) {
			this.labelSoGD.string   = data.info;
			this.labelStatus.string = data.status == 0 ? "Chờ duyệt" : (data.status == 1 ? "Thành công" : "Thất bại");
			this.labelStatus.node.color = data.status == 0 ? cc.color(45, 171, 255, 255) : (data.status == 1 ? cc.color(0, 255, 71, 255) : cc.color(255, 0, 0, 255));

			this.linkObj.status.string = data.status == 0 ? "Chờ duyệt" : (data.status == 1 ? "Thành công" : "Thất bại");
			this.linkObj.status.node.color = data.status == 0 ? cc.color(45, 171, 255, 255) : (data.status == 1 ? cc.color(0, 255, 71, 255) : cc.color(255, 0, 0, 255));
		}
	},
	onRemoveClick: function(){
		cc.RedT.dialog.objShow.active = false;
        cc.RedT.dialog.showRemove(event, 'rutbank', this.linkObj.data._id);
    },
});
