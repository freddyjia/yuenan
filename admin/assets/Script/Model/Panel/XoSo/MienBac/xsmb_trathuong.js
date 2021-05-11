
var Helper = require('Helper');

cc.Class({
	extends: cc.Component,

	properties: {
		date:    cc.Label,
		changerDate: 0,
		giai1: cc.EditBox,
		giai2: {
			default: [],
			type: cc.EditBox,
		},
		giai3: {
			default: [],
			type: cc.EditBox,
		},
		giai4: {
			default: [],
			type: cc.EditBox,
		},
		giai5: {
			default: [],
			type: cc.EditBox,
		},
		giai6: {
			default: [],
			type: cc.EditBox,
		},
		giai7: {
			default: [],
			type: cc.EditBox,
		},
		giaiDB: cc.EditBox,
		notice:  cc.Node,
		nPrefab: cc.Prefab,

	},

	onLoad () {
		let date = new Date();
		this.date.string = Helper.numberPad(date.getDate(), 2) + '/' + Helper.numberPad(date.getMonth()+1, 2) + '/' + date.getFullYear();
		this.get_data();
	},
	get_data:function(page = 1){
		cc.RedT.send({xs:{mb:{getdate:this.date.string}}});
	},
	dateNext: function(){
		this.changerDate++;
		this.dateChanger();
	},
	datePre: function(){
		this.changerDate--;
		this.dateChanger();
	},
	dateChanger: function(){
		let date = new Date();
		date.setDate(date.getDate()+this.changerDate);
		this.date.string = Helper.numberPad(date.getDate(), 2) + '/' + Helper.numberPad(date.getMonth()+1, 2) + '/' + date.getFullYear();
		this.reset();
		this.get_data();
	},
	onData: function(data){
        if (!!data.date) {
        	this.dataDate(data.date);
        }
        if (!!data.notice) {
        	this.addNotice(data.notice);
        }
    },
    addNotice:function(text){
		let notice = cc.instantiate(this.nPrefab)
		notice = notice.getComponent('mini_warning')
		notice.text.string = text;
		this.notice.addChild(notice.node);
	},
    reset: function(){
    	this.giai1.string = '';
		this.giai2.forEach(function(obj){
			obj.string = '';
		});
		this.giai3.forEach(function(obj){
			obj.string = '';
		});
		this.giai4.forEach(function(obj){
			obj.string = '';
		});
		this.giai5.forEach(function(obj){
			obj.string = '';
		});
		this.giai6.forEach(function(obj){
			obj.string = '';
		});
		this.giai7.forEach(function(obj){
			obj.string = '';
		});
		this.giaiDB.string = '';
    },
    dataDate: function(data){
    	this.giai1.string = data.g1;
		this.giai2.forEach(function(obj, i){
			obj.string = !!data.g2[i] ? data.g2[i] : '';
		});
		this.giai3.forEach(function(obj, i){
			obj.string = !!data.g3[i] ? data.g3[i] : '';
		});
		this.giai4.forEach(function(obj, i){
			obj.string = !!data.g4[i] ? data.g4[i] : '';
		});
		this.giai5.forEach(function(obj, i){
			obj.string = !!data.g5[i] ? data.g5[i] : '';
		});
		this.giai6.forEach(function(obj, i){
			obj.string = !!data.g6[i] ? data.g6[i] : '';
		});
		this.giai7.forEach(function(obj, i){
			obj.string = !!data.g7[i] ? data.g7[i] : '';
		});
		this.giaiDB.string = data.gdb;
    },
    onUpdateKQ: function(){
    	let giai2 = this.giai2.map(function(obj){
			return obj.string;
		});
		let giai3 = this.giai3.map(function(obj){
			return obj.string;
		});
		let giai4 = this.giai4.map(function(obj){
			return obj.string;
		});
		let giai5 = this.giai5.map(function(obj){
			return obj.string;
		});
		let giai6 = this.giai6.map(function(obj){
			return obj.string;
		});
		let giai7 = this.giai7.map(function(obj){
			return obj.string;
		});
		cc.RedT.send({xs:{mb:{update:{date:this.date.string, giai1:this.giai1.string, giaidb:this.giaiDB.string, giai2:giai2, giai3:giai3, giai4:giai4, giai5:giai5, giai6:giai6, giai7:giai7}}}});
    },
    onTraThuong: function(){
		cc.RedT.send({xs:{mb:{trathuong:this.date.string}}});
    },
});
