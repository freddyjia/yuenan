
var Helper = require('Helper');

cc.Class({
	extends: cc.Component,

	properties: {
		inputPhone: {
			default: null,
			type: cc.EditBox
		},
		inputEmail: {
			default: null,
			type: cc.EditBox
		},
		inputCMT: {
			default: null,
			type: cc.EditBox
		},
		inputRED: {
			default: null,
			type: cc.EditBox
		},
		inputXU: {
			default: null,
			type: cc.EditBox
		},
		inputPass: {
			default: null,
			type: cc.EditBox
		},
		toggleBot: {
			default: null,
			type: cc.ToggleContainer
		},
		typeUser: '',
	},
	onDisable: function () {
		this.clear();
	},
	onChangerRED: function(va){
		va = Helper.numberWithCommas(Helper.getOnlyNumberInString(va));
		this.inputRED.string = va == "0" ? "" : va;
	},
	onChangerXU: function(va){
		va = Helper.numberWithCommas(Helper.getOnlyNumberInString(va));
		this.inputXU.string = va == "0" ? "" : va;
	},
	onChangerClick: function(){
		if (Helper.isEmpty(this.inputPhone.string) &&
			Helper.isEmpty(this.inputEmail.string) &&
			Helper.isEmpty(this.inputCMT.string) &&
			Helper.isEmpty(this.inputRED.string) &&
			Helper.isEmpty(this.inputXU.string) &&
			Helper.isEmpty(this.inputPass.string) &&
			this.typeUser == "0"
			)
		{
			cc.RedT.notice.show({title: "THẤT BẠI", text: "Không có dữ liệu..."});
		}else{
			cc.RedT.send({
				users:{
					update:{
						id: this.idT,
						data: {
							phone: this.inputPhone.string,
							email: this.inputEmail.string,
							cmt:   this.inputCMT.string,
							red:   this.inputRED.string,
							xu:    this.inputXU.string,
							pass:  this.inputPass.string,
							type:  this.typeUser,
						}
					}
				}
			});
		}
	},
	clear: function(){
		this.inputPhone.string = "";
		this.inputEmail.string = "";
		this.inputCMT.string   = "";
		this.inputRED.string   = "";
		this.inputXU.string    = "";
		this.inputPass.string  = "";
		this.typeUser          = "0";

		Promise.all(this.toggleBot.node.children.map(function(obj, index){
			obj = obj.getComponent(cc.Toggle);
			if (index == 0) {
				obj.node.children[1].active = obj.isChecked = true;
			}else{
				obj.node.children[1].active = obj.isChecked = false;
			}
		}));
	},
	onChangerBot: function(e) {
		this.typeUser = e.target.name;
	},
});
