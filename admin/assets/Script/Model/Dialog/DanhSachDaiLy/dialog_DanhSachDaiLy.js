
var helper = require('Helper');

cc.Class({
	extends: cc.Component,

	properties: {
		editDaiLy: {
			default: null,
			type: cc.EditBox
		},
		editNick: {
			default: null,
			type: cc.EditBox
		},
		editPhone: {
			default: null,
			type: cc.EditBox
		},
		editMap: {
			default: null,
			type: cc.EditBox
		},
		editFB: {
			default: null,
			type: cc.EditBox
		},

	},
	show: function(name, id = null) {
		if(!!id){
			this.idT = id;
		}
		Promise.all(this.node.children.map(function(obj){
			if (obj.name == name) {
				obj.active = true;
			}else{
				obj.active = false;
			}
		}))
	},
	onAddClick: function() {
		if (helper.isEmpty(this.editDaiLy.string) || helper.isEmpty(this.editNick.string) || helper.isEmpty(this.editPhone.string) || helper.isEmpty(this.editMap.string) || helper.isEmpty(this.editFB.string)) {
			cc.RedT.notice.show({title: "ĐẠI LÝ", text: "Không được bỏ trống các thông tin..."});
		}else{
			cc.RedT.send({shop:{daily:{add:{name: this.editDaiLy.string, nickname: this.editNick.string, phone: this.editPhone.string, fb: this.editFB.string}}}});
		}
	},
	onRemoveClick: function() {
		cc.RedT.send({shop:{daily:{remove:this.idT}}});
	},
});
