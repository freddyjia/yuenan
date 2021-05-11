
var Helper = require('Helper');

cc.Class({
	extends: cc.Component,

	properties: {
		content:    {
			default: null,
			type: cc.Node
		},
		pagination: {
			default: null,
			type: cc.Node
		},
		time: {
			default: null,
			type: cc.Label
		},
		nickname: {
			default: null,
			type: cc.Label
		},
		nhamang: {
			default: null,
			type: cc.Label
		},
		menhgia: {
			default: null,
			type: cc.Label
		},
		maThe: {
			default: null,
			type: cc.Label
		},
		soSeri: {
			default: null,
			type: cc.Label
		},
		nhan: {
			default: null,
			type: cc.Label
		},
		statusT: {
			default: null,
			type: cc.Label
		},
		isLoad:     false,
	},

	// LIFE-CYCLE CALLBACKS:

	onLoad () {
		this.status = "-1";
		this.statusUpdate = "1";

		this.pagination = this.pagination.getComponent('Pagination');

		Promise.all(this.content.children.map(function(obj){
			return obj.getComponent('YeuCauNapThe_item');
		}))
		.then(data => {
			this.content = data;
		})
		this.pagination.init(this);
	},
	onEnable: function () {
		!this.isLoad && this.get_data()
	},
	get_data: function(page = 1){
		cc.RedT.send({nap_the:{get_data:{status: this.status, page: page}}});
	},
	onSelectT: function(event, name){
		Promise.all(this.node.children.map(function(argument){
			if (argument.name == name) {
				argument.active = true;
			}else{
				argument.active = false;
			}
		}))
	},
	onData: function(data){
		if (void 0 !== data.get_data) {
			this.setData(data.get_data)
		}
		if (void 0 !== data.update) {
			this.updateInfo(data.update);
		}
		if (!!data.remove) {
			this.onSelectT(null, 'list');
			this.info.node.active = false;
		}
	},
	updateInfo: function(data){
		if (data.id == this.info.idT) {
			this.info.danhan.string = this.nhan.string = Helper.numberWithCommas(data.nhan);
			this.statusT.string     = this.info.status.string = data.status == 0 ? "Chờ duyệt" : (data.status == 1 ? "Thành công" : "Thẻ sai");
			this.statusT.node.color = this.info.status.node.color = data.status == 0 ? cc.color(45, 171, 255, 255) : (data.status == 1 ? cc.color(0, 255, 71, 255) : cc.color(255, 0, 0, 255));
		}
	},
	getInfo: function(info){
		this.info            = info;
		this.time.string     = info.time.string;
		this.nickname.string = info.nickname.string;
		this.nhamang.string  = info.nhamang.string;
		this.menhgia.string  = info.menhgia.string;
		this.nhan.string     = info.danhan.string;
		this.maThe.string    = info.soThe;
		this.soSeri.string   = info.soSeri;

		this.statusT.string     = info.statusT == 0 ? "Chờ duyệt" : (info.statusT == 1 ? "Thành công" : "Thẻ sai");
		this.statusT.node.color = info.statusT == 0 ? cc.color(45, 171, 255, 255) : (info.statusT == 1 ? cc.color(0, 255, 71, 255) : cc.color(255, 0, 0, 255));
	},
	setData: function(data){
		var self = this
		this.pagination.onSet(data.page, data.kmess, data.total)
		Promise.all(this.content.map(function(obj, i){
			var dataT = data.data[i];
			if (void 0 !== dataT) {
				obj.init(self);
				obj.node.active     = true;
				obj.idT             = dataT._id;
				obj.soThe           = dataT.maThe;
				obj.soSeri          = dataT.seri;
				obj.statusT         = dataT.status;
				obj.time.string     = Helper.getStringDateByTime(dataT.time);
				obj.nickname.string = dataT.name;
				obj.nhamang.string  = dataT.nhaMang;
				obj.menhgia.string  = Helper.numberWithCommas(dataT.menhGia);
				obj.danhan.string   = Helper.numberWithCommas(dataT.nhan);
				obj.status.string   = dataT.status == 0 ? "Chờ duyệt" : (dataT.status == 1 ? "Thành công" : "Thẻ sai");
				obj.status.node.color = dataT.status == 0 ? cc.color(45, 171, 255, 255) : (dataT.status == 1 ? cc.color(0, 255, 71, 255) : cc.color(255, 0, 0, 255));
			}else{
				obj.node.active = false
			}
		}))
	},
	changerStatus: function(event, data) {
		this.status = data;
		this.get_data();
	},
	changerStatusUpdate: function(event, data) {
		this.statusUpdate = data;
	},
	onUpdateClick: function(){
		cc.RedT.send({nap_the:{update:{id: this.info.idT, status: this.statusUpdate}}});
	},
	onRemoveClick: function(){
        cc.RedT.dialog.showRemove(event, 'napthe', this.info.idT);
	},
});
