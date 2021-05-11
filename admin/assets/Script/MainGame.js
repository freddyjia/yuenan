
var helper = require('Helper');
var Panel = require('Panel');
var SignIn = require('SignIn');
var MainAudio = require('MainAudio');
var Dialog = require('Dialog');
var Notice = require('Notice');

cc.Class({
	extends: cc.Component,
	properties: {
		nodeSignIn: SignIn,
		nodePanel: Panel,
		audio: MainAudio,
		dialog: Dialog,
		loading: cc.Node,
		notice: Notice,
		IS_LOGIN: false,
		IS_SOUND: true,
		isConnected: false,
	},
	onLoad: function () {
		this._socket = null;
		cc.RedT = this;
		this.user = {};
		this.dialog.init();
		this.nodePanel.init();
		this.reconnect();
	},
	connect: function (url, path = '/', port = false, ss = false) {
		if (!this.isConnected) {
			this._socket = new WebSocket("ws" + (ss ? "s" : "") + "://" + url + (!!port ? ":" + port : "") + path);
			this._socket.onopen = this._onSocketConnect;
			this._socket.onclose = this._onSocketDisconnect;
			this._socket.onmessage = this._onSocketData;
			this._socket.onerror = this._onSocketError;
			this.isConnected = !0;
		}
	},
	disconnect: function () {
		this.isConnected = !1,
			this._socket.close()
	},
	send: function (message) {
		this._socket.OPEN == this._socket.readyState && this._socket.send(this._encodeMessage(message));
	},
	_decodeMessage: function (message) {
		return JSON.parse(message)
	},
	_encodeMessage: function (message) {
		return JSON.stringify(message)
	},
	_onSocketConnect: function () {
		cc.RedT.isConnected = true;
	},
	_onSocketDisconnect: function () {
		cc.RedT.isConnected = false;
		cc.RedT.signOut();
	},
	_onSocketData: function (message) {
		var data = message.data;
		data = cc.RedT._decodeMessage(data);
		cc.RedT.onData(data);
	},
	_onSocketError: function (message) {
		//cc.RedT.errConnect();
		cc.RedT.signOut();
	},
	reconnect: function () {
		this.connect('202.43.239.22', '/admin', 4500);
		//	this.connect('127.0.0.1', '/admin',8090);
		console.log("链接")
		//this.connect('redvip.club', '/admin');
		//this.connect('157.245.196.220', '/admin');
	},
	auth: function (obj) {
		var self = this;
		this.loading.active = true;
		this.reconnect();
		if (this._socket == null || this._socket.readyState != 1) {
			setTimeout(function () {
				self.send(obj);
			}, 300);
		} else {
			this.send(obj)
		}
	},
	unAuthorized: function (data) {
		this.loading.active = false;
		if (void 0 !== data["message"]) {
			this.notice.show({ title: 'ĐĂNG KÝ', text: 'Có lỗi sảy ra, xin vui lòng thử lại...' });
		} else {
			this.notice.show(data);
		}
	},
	onData: function (data) {
		//console.log(data);
		if (void 0 !== data["unauth"]) {
			this.unAuthorized(data["unauth"]);
		}
		if (void 0 !== data.Authorized) {
			this.signIn()
		}

		// Bigin Game
		if (void 0 !== data.taixiu) {
			this.nodePanel.TaiXiu.onData(data.taixiu);
		}
		if (void 0 !== data.baucua) {
			this.nodePanel.BauCua.onData(data.baucua);
		}
		if (void 0 !== data.xocxoc) {
			this.nodePanel.XocXoc.onData(data.xocxoc);
		}
		if (void 0 !== data.mini_poker) {
			this.nodePanel.MiniPoker.onData(data.mini_poker);
		}
		if (void 0 !== data.big_babol) {
			this.nodePanel.BigBabol.onData(data.big_babol);
		}
		if (void 0 !== data.vq_red) {
			this.nodePanel.VuongQuocRed.onData(data.vq_red);
		}
		if (void 0 !== data.mini3cay) {
			this.nodePanel.Mini3Cay.onData(data.mini3cay);
		}
		if (void 0 !== data.angrybird) {
			this.nodePanel.AngryBird.onData(data.angrybird);
		}
		if (void 0 !== data.candy) {
			this.nodePanel.Candy.onData(data.candy);
		}
		if (void 0 !== data.longlan) {
			this.nodePanel.LongLan.onData(data.longlan);
		}
		if (void 0 !== data.xs) {
			this.nodePanel.XoSo.onData(data.xs);
		}
		// End Game

		// Shop & User
		if (void 0 !== data.mua_the) {
			this.nodePanel.yeuCauRutThe.onData(data.mua_the);
		}
		if (void 0 !== data.nap_the) {
			this.nodePanel.yeuCauNapThe.onData(data.nap_the);
		}
		if (void 0 !== data.thecao) {
			this.nodePanel.quanLyTheCao.onData(data.thecao);
		}
		if (void 0 !== data.daily) {
			this.nodePanel.danhSachDaiLy.onData(data.daily);
		}
		if (void 0 !== data.users) {
			this.nodePanel.quanLyNguoiDung.onData(data.users);
		}
		if (void 0 !== data.giftcode) {
			this.nodePanel.GiftCode.onData(data.giftcode);
		}

		if (void 0 !== data.banklist) {
			this.nodePanel.BankList.onData(data.banklist);
		}

		if (void 0 !== data.bankrut) {
			this.nodePanel.BankRut.onData(data.bankrut);
		}
		if (void 0 !== data.bankrut_remove) {
			this.nodePanel.BankRut.remove();
		}
		if (void 0 !== data.banknap) {
			this.nodePanel.BankNap.onData(data.banknap);
		}

		if (void 0 !== data.sys) {
			this.nodePanel.HeThong.onData(data.sys);
		}

		if (void 0 !== data.notice) {
			this.notice.show(data.notice);
		}
	},
	dataUser: function (data) {
	},
	signOut: function () {
		this.user = {};
		this.IS_LOGIN = false;
		this.nodeSignIn.node.active = true;
		this.nodePanel.node.active = false;
		this.AllReset();
	},
	signIn: function () {
		this.loading.active = false;
		this.IS_LOGIN = true;
		this.nodeSignIn.node.active = false;
		this.nodePanel.node.active = true;
	},
	AllReset: function () {
		this.loading.active = false;
		this.nodePanel.isSignOut();
	},
	errConnect: function () {
		this.notice.show({ title: 'THÔNG BÁO', text: 'Mất kết nối...' });
	},
});
