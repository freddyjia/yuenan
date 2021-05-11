
var Helper = require('Helper');

cc.Class({
	extends: cc.Component,

	properties: {
		labelGD:       cc.Label,
		labelTime:     cc.Label,
		labelBank:     cc.Label,
		labelNap:      cc.Label,
		labelKhop:     cc.Label,
		labelNick:     cc.Label,
		labelName:     cc.Label,
		labelNameGo:   cc.Label,
		labelSTK:      cc.Label,
		labelHinhThuc: cc.Label,
		labelStatus:   cc.Label,
	},
	onEnable: function () {
		this.setData(this.node.parent.idT.data);
	},
	setData: function(data){
		this.labelGD.string   = data.GD;
		this.labelTime.string = Helper.getStringDateByTime(data.time);
		this.labelBank.string = data.bank.toUpperCase();
		this.labelNap.string  = Helper.numberWithCommas(data.money);
		this.labelKhop.string = !!data.info ? data.info : '';
		this.labelNick.string = data.uid +  ' - ' + data.nick;
		this.labelNameGo.string = !!data.namego ? data.namego : '';

		this.labelName.string     = data.name;
		this.labelSTK.string      = !!data.branch ? data.branch : '';

		this.labelHinhThuc.string = data.hinhthuc == '1' ? 'Internet Banking' : (data.hinhthuc == '2' ? 'ATM' : 'Quầy giao dịch');

		this.labelStatus.string = data.status == 0 ? "Chờ duyệt" : (data.status == 1 ? "Thành công" : "Thất bại");
		this.labelStatus.node.color = data.status == 0 ? cc.color(45, 171, 255, 255) : (data.status == 1 ? cc.color(0, 255, 71, 255) : cc.color(255, 0, 0, 255));
	},
	onUpdateClick: function(event, status){
		this.updateStatus(status);
		this.node.parent.idT.updateStatus(status);
		cc.RedT.send({shop:{bank:{updateNap:{id:this.node.parent.idT.data._id, status:status}}}});
	},
	onRemoveClick: function(){
		cc.RedT.dialog.showBank(event, 'nap_remove');
	},
	updateStatus: function(status){
		this.labelStatus.string = status == 0 ? "Chờ duyệt" : (status == 1 ? "Thành công" : "Thất bại");
		this.labelStatus.node.color = status == 0 ? cc.color(45, 171, 255, 255) : (status == 1 ? cc.color(0, 255, 71, 255) : cc.color(255, 0, 0, 255));
	},
});
