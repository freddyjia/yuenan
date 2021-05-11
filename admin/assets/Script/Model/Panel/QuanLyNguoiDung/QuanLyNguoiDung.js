
var Helper = require('Helper');

var QuanLyUList = require('QuanLyNguoiDung_list');
var QuanLyUInfo = require('QuanLyNguoiDung_info');
var QuanLyUEdit = require('QuanLyNguoiDung_edit');
var UsersRemove = require('Users_remove');
var HistoryChuyen = require('Users_chuyenred');

cc.Class({
	extends: cc.Component,

	properties: {
		QuanLyUList: QuanLyUList,
		QuanLyUInfo: QuanLyUInfo,
		QuanLyUEdit: QuanLyUEdit,
		UsersRemove: UsersRemove,
		HistoryChuyen: HistoryChuyen,
		active: 1,
	},
	onSelectT: function (event, name, id = null) {
		this.active = name == 'edit' || name == 'remove' ? 2 : 1;
		if (!!id) {
			this.QuanLyUEdit.idT = id;
			this.active = 1;
		}
		Promise.all(this.node.children.map(function (argument) {
			if (argument.name == name) {
				argument.active = true;
			} else {
				argument.active = false;
			}
		}))
	},
	onDisable: function () {
		if (this.active == 2) {
			this.onSelectT(null, "info");
		}
	},
	onData: function (data) {
		console.log("获取信息",data)
		if (void 0 !== data.get_users) {
			this.QuanLyUList.setData(data.get_users);
		}
		if (void 0 !== data.get_info) {
			this.QuanLyUInfo.setData(data.get_info);
		}
		if (void 0 !== data.update) {
		}
		if (void 0 !== data.chuyen) {
			this.HistoryChuyen.onData(data.chuyen);
		}
		if (!!data.taixiu) {
			cc.RedT.dialog.HistoryTaiXiu.onData(data.taixiu);
		}
	},
	showHistoryTaixiu: function (event, taixiu) {
		cc.RedT.dialog.showHistoryTaiXiu(event, taixiu);
	},
});
