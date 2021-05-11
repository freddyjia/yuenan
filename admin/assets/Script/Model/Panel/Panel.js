
cc.Class({
	extends: cc.Component,

	properties: {
		header:       cc.Node,
		body:         cc.Node,
		nodePanel:    cc.Node,
		nodeBack:     cc.Node,
		buttonToggle: cc.Node,

		yeuCauRutThe:    cc.Node,
		yeuCauNapThe:    cc.Node,
		quanLyTheCao:    cc.Node,
		GiftCode:        cc.Node,
		danhSachDaiLy:   cc.Node,
		doiMatKhau:      cc.Node,

		quanLyNguoiDung: cc.Prefab,
		TaiXiu: cc.Prefab,
		BauCua: cc.Prefab,
		XocXoc: cc.Prefab,
		MiniPoker:       cc.Prefab,
		Mini3Cay:        cc.Prefab,
		BigBabol:        cc.Prefab,
		AngryBird:       cc.Prefab,
		VuongQuocRed:    cc.Prefab,
		Candy:           cc.Node,
		LongLan:         cc.Node,
		XoSo:            cc.Node,

		BankList:        cc.Node,
		BankRut:         cc.Node,
		BankNap:         cc.Node,

		HeThong:         cc.Node,
	},
	init:function(){
		// Tai Xiu
		let TaiXiu = cc.instantiate(this.TaiXiu);
		TaiXiu = TaiXiu.getComponent('TaiXiu');
		this.TaiXiu = TaiXiu;
		this.body.addChild(TaiXiu.node);

		// Bau Cua
		let BauCua = cc.instantiate(this.BauCua);
		BauCua = BauCua.getComponent('BauCua');
		this.BauCua = BauCua;
		this.body.addChild(BauCua.node);

		// Xoc Xoc
		let XocXoc = cc.instantiate(this.XocXoc);
		XocXoc = XocXoc.getComponent('XocXoc');
		this.XocXoc = XocXoc;
		this.body.addChild(XocXoc.node);

		// MiniPoker
		let MiniPoker = cc.instantiate(this.MiniPoker);
		MiniPoker = MiniPoker.getComponent('MiniPoker');
		this.MiniPoker = MiniPoker;
		this.body.addChild(MiniPoker.node);

		// Mini3Cay
		let Mini3Cay = cc.instantiate(this.Mini3Cay);
		Mini3Cay = Mini3Cay.getComponent('Mini3Cay');
		this.Mini3Cay = Mini3Cay;
		this.body.addChild(Mini3Cay.node);

		// BigBabol
		let BigBabol = cc.instantiate(this.BigBabol);
		BigBabol = BigBabol.getComponent('BigBabol');
		this.BigBabol = BigBabol;
		this.body.addChild(BigBabol.node);

		// AngryBird
		let AngryBird = cc.instantiate(this.AngryBird);
		AngryBird = AngryBird.getComponent('AngryBirds');
		this.AngryBird = AngryBird;
		this.body.addChild(AngryBird.node);

		// VuongQuocRed
		let VuongQuocRed = cc.instantiate(this.VuongQuocRed);
		VuongQuocRed = VuongQuocRed.getComponent('VuongQuocRed');
		this.VuongQuocRed = VuongQuocRed;
		this.body.addChild(VuongQuocRed.node);
		
		// Quan Ly Nguoi Dung
		let quanLyNguoiDung = cc.instantiate(this.quanLyNguoiDung);
		quanLyNguoiDung = quanLyNguoiDung.getComponent('QuanLyNguoiDung');
		this.quanLyNguoiDung = quanLyNguoiDung;
		this.body.addChild(quanLyNguoiDung.node);

		this.yeuCauRutThe = this.yeuCauRutThe.getComponent('YeuCauRutThe');
		this.yeuCauNapThe = this.yeuCauNapThe.getComponent('YeuCauNapThe');
		this.quanLyTheCao = this.quanLyTheCao.getComponent('QuanLyTheCao');
		this.GiftCode = this.GiftCode.getComponent('GiftCode');
		this.danhSachDaiLy = this.danhSachDaiLy.getComponent('DanhSachDaiLy');
		this.doiMatKhau = this.doiMatKhau.getComponent('DoiMatKhau');
		this.Candy = this.Candy.getComponent('Candy');
		this.LongLan = this.LongLan.getComponent('LongLan');
		this.BankList = this.BankList.getComponent('DanhSachBank');
		this.BankRut = this.BankRut.getComponent('BankRut');
		this.BankNap = this.BankNap.getComponent('BankNap');
		this.HeThong = this.HeThong.getComponent('HeThong');
		this.XoSo = this.XoSo.getComponent('XoSo');
	},
	onLoad () {
		this.show        = false;
		this.initMode    = this.nodePanel.x;
		this.actionShow  = cc.sequence(cc.moveTo(0.2, cc.v2(this.nodePanel.x+300, 0)), cc.callFunc(function(){
			this.buttonToggle.scaleX = 1;
		}, this));
		this.actionHiden = cc.sequence(cc.moveTo(0.2, cc.v2(this.nodePanel.x, 0)), cc.callFunc(function(){
			this.buttonToggle.scaleX = -1
		}, this));
		Promise.all(this.header.children.map(function(obj) {
			return obj.getComponent('itemHeadMenu')
		}))
		.then(result => {
			this.header = result;
		})
	},
	onPanelClick: function(event, name){
		cc.RedT.audio.playClick();
		Promise.all(this.header.map(function(obj) {
			if (obj.node.name == name) {
				obj.select();
			}else{
				obj.unselect();
			}
		}))
		Promise.all(this.body.children.map(function(obj) {
			if (obj.name == name) {
				obj.active = true;
			}else{
				obj.active = false;
			}
		}))
	},
	toggler: function(){
		this.show = !this.show;
		this.nodePanel.stopAllActions();
		if (this.show) {
			this.nodeBack.active = true;
			this.nodePanel.runAction(cc.sequence(cc.moveTo(0.2, cc.v2(this.nodePanel.x+300, 0)), cc.callFunc(function(){
				this.buttonToggle.scaleX = 1;
			}, this)));
		}else{
			this.nodeBack.active = false;
			this.nodePanel.runAction(cc.sequence(cc.moveTo(0.2, cc.v2(this.nodePanel.x-300, 0)), cc.callFunc(function(){
				this.buttonToggle.scaleX = -1
			}, this)));
		}
	},
	togglerHiden: function(){
		this.show = false;
		this.nodeBack.active = false;
		this.nodePanel.stopAllActions();
		this.nodePanel.runAction(cc.sequence(cc.moveTo(0.2, cc.v2(this.nodePanel.x-300, 0)), cc.callFunc(function(){
			this.buttonToggle.scaleX = -1
		}, this)));
	},
	isSignOut: function(){
		this.TaiXiu.setLogout();
		this.BauCua.setLogout();
	},
});
