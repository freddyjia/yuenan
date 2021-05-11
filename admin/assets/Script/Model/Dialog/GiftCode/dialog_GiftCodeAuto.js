
var helper = require('Helper');

cc.Class({
	extends: cc.Component,

	properties: {
		editH: {
			default: null,
			type: cc.EditBox
		},
		editP: {
			default: null,
			type: cc.EditBox
		},
		editSL: {
			default: null,
			type: cc.EditBox
		},
		editGift: {
			default: null,
			type: cc.EditBox
		},
		editRe: {
			default: null,
			type: cc.EditBox
		},
		editReP: {
			default: null,
			type: cc.EditBox
		},
		status: {
			default: [],
			type: cc.Toggle,
		},
	},
	onEnable: function () {
		this.onGetAuto();
	},
	onData: function(data){
		this.data = data;
		this.editH.string    = data.h;
		this.editP.string    = data.p;
		this.editSL.string   = data.sl;
		this.editGift.string = data.gift;
		this.editRe.string   = data.re;
		this.editReP.string  = data.reP;

		if (data.status) {
			this.status[0].isChecked = false;
			this.status[1].isChecked = true;
		}else{
			this.status[0].isChecked = true;
			this.status[1].isChecked = false;
		}
	},
	onChangerStatus: function(event) {
		if (event.node.name === '0') {
			this.data.status = false;
		}else{
			this.data.status = true;
		}
	},
	onGetAuto: function() {
		cc.RedT.send({giftcode:{get_auto:true}});
	},
	onSaveClick: function() {
		this.data.h    = this.editH.string;
		this.data.p    = this.editP.string;
		this.data.sl   = this.editSL.string;
		this.data.gift = this.editGift.string;
		this.data.re   = this.editRe.string;
		this.data.reP  = this.editReP.string;

		cc.RedT.send({giftcode:{get_autoSave:this.data}});
	},
});
