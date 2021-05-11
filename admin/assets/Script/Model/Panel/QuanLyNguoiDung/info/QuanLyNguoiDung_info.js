
var Helper = require('Helper');

cc.Class({
	extends: cc.Component,

	properties: {
		// User info
		nodeBot: cc.Node,
		nick: cc.Label,
		UID: cc.Label,
		nickname: cc.Label,
		phone: cc.Label,
		email: cc.Label,
		cmt: cc.Label,
		red: cc.Label,
		xu: cc.Label,
		ketsat: cc.Label,
		thuong: cc.Label,
		redLai: cc.Label,
		xuLai: cc.Label,
		redPlay: cc.Label,
		redWin: cc.Label,
		redLost: cc.Label,
		redHu: cc.Label,
		xuPlay: cc.Label,
		xuWin: cc.Label,
		xuLost: cc.Label,
		xuHu: cc.Label,
		regDate: cc.Label,
		joinedOn: cc.Label,
		lastLogin: cc.Label,
		vipHT: cc.Label,
		vipTich: cc.Label,

		// Tai Xiu Info
		TX_Red_Play: cc.Label,
		TX_Red_Win: cc.Label,
		TX_Red_Lost: cc.Label,
		TX_Red_Lai: cc.Label,
		TX_Red_DWinH: cc.Label,
		TX_Red_DWin: cc.Label,
		TX_Red_DLostH: cc.Label,
		TX_Red_DLost: cc.Label,

		TX_Xu_Play: cc.Label,
		TX_Xu_Win: cc.Label,
		TX_Xu_Lost: cc.Label,
		TX_Xu_Lai: cc.Label,
		TX_Xu_DWinH: cc.Label,
		TX_Xu_DWin: cc.Label,
		TX_Xu_DLostH: cc.Label,
		TX_Xu_DLost: cc.Label,

		// Chan Le Info
		CL_Red_Play: cc.Label,
		CL_Red_Win: cc.Label,
		CL_Red_Lost: cc.Label,
		CL_Red_Lai: cc.Label,
		CL_Red_DWinH: cc.Label,
		CL_Red_DWin: cc.Label,
		CL_Red_DLostH: cc.Label,
		CL_Red_DLost: cc.Label,

		CL_Xu_Play: cc.Label,
		CL_Xu_Win: cc.Label,
		CL_Xu_Lost: cc.Label,
		CL_Xu_Lai: cc.Label,
		CL_Xu_DWinH: cc.Label,
		CL_Xu_DWin: cc.Label,
		CL_Xu_DLostH: cc.Label,
		CL_Xu_DLost: cc.Label,

		// Bau Cua
		BC_Red_Win: cc.Label,
		BC_Red_Lost: cc.Label,
		BC_Red_Lai: cc.Label,
		BC_Xu_Win: cc.Label,
		BC_Xu_Lost: cc.Label,
		BC_Xu_Lai: cc.Label,
		BC_Thuong: cc.Label,

		// Mini Poker
		mPoker_Red_Win: cc.Label,
		mPoker_Red_Lost: cc.Label,
		mPoker_Red_Lai: cc.Label,
		mPoker_Xu_Win: cc.Label,
		mPoker_Xu_Lost: cc.Label,
		mPoker_Xu_Lai: cc.Label,
		mPoker_Thuong: cc.Label,
		mPoker_Hu: cc.Label,
		mPoker_HuXu: cc.Label,

		// Mini Poker
		m3Cay_Red_Win: cc.Label,
		m3Cay_Red_Lost: cc.Label,
		m3Cay_Red_Lai: cc.Label,
		m3Cay_Xu_Win: cc.Label,
		m3Cay_Xu_Lost: cc.Label,
		m3Cay_Xu_Lai: cc.Label,
		m3Cay_Thuong: cc.Label,
		m3Cay_Hu: cc.Label,
		m3Cay_HuXu: cc.Label,

		// Big Babol
		bigBabol_Red_Win: cc.Label,
		bigBabol_Red_Lost: cc.Label,
		bigBabol_Red_Lai: cc.Label,
		bigBabol_Xu_Win: cc.Label,
		bigBabol_Xu_Lost: cc.Label,
		bigBabol_Xu_Lai: cc.Label,
		bigBabol_Thuong: cc.Label,
		bigBabol_Hu: cc.Label,
		bigBabol_HuXu: cc.Label,

		// Angrybird
		Angrybird_Red_Win: cc.Label,
		Angrybird_Red_Lost: cc.Label,
		Angrybird_Red_Lai: cc.Label,
		Angrybird_Xu_Win: cc.Label,
		Angrybird_Xu_Lost: cc.Label,
		Angrybird_Xu_Lai: cc.Label,
		Angrybird_Thuong: cc.Label,
		Angrybird_Hu: cc.Label,
		Angrybird_HuXu: cc.Label,

		// Cao Thap
		upDow_Red_Win: cc.Label,
		upDow_Red_Lost: cc.Label,
		upDow_Red_Lai: cc.Label,
		upDow_Xu_Win: cc.Label,
		upDow_Xu_Lost: cc.Label,
		upDow_Xu_Lai: cc.Label,
		upDow_Thuong: cc.Label,
		upDow_Hu: cc.Label,
		upDow_HuXu: cc.Label,

		// Vương Quốc Red
		VQR_Red_Win: cc.Label,
		VQR_Red_Lost: cc.Label,
		VQR_Red_Lai: cc.Label,
		VQR_Xu_Win: cc.Label,
		VQR_Xu_Lost: cc.Label,
		VQR_Xu_Lai: cc.Label,
		VQR_Thuong: cc.Label,
		VQR_Hu: cc.Label,
		VQR_HuXu: cc.Label,

		// Vương Quốc Red
		Candy_Red_Win: cc.Label,
		Candy_Red_Lost: cc.Label,
		Candy_Red_Lai: cc.Label,
		Candy_Xu_Win: cc.Label,
		Candy_Xu_Lost: cc.Label,
		Candy_Xu_Lai: cc.Label,
		Candy_Thuong: cc.Label,
		Candy_Hu: cc.Label,
		Candy_HuXu: cc.Label,

		// Vương Quốc Red
		Long_Red_Win: cc.Label,
		Long_Red_Lost: cc.Label,
		Long_Red_Lai: cc.Label,
		Long_Xu_Win: cc.Label,
		Long_Xu_Lost: cc.Label,
		Long_Xu_Lai: cc.Label,
		Long_Thuong: cc.Label,
		Long_Hu: cc.Label,
		Long_HuXu: cc.Label,

	},

	setData: function (data) {
		this.onInfoProfile(data.profile);
		this.onInfoTX(data.taixiu);
		this.onInfoBC(data.baucua);
		this.onInfoMPoker(data.minipoker);
		this.onInfoM3Cay(data.mini3cay);
		this.onInfoBigBabol(data.bigbabol);
		this.onInfoUpDow(data.caothap);
		this.onInfoVQR(data.vqred);
		this.onInfoAngrybird(data.angrybird);
		this.onInfoCandy(data.candy);
		this.onInfoLong(data.longlan);
	},
	onInfoProfile: function (data) {
		this.nodeBot.active = !!data.type;
		this.nick.string = data.name;
		this.UID.string = data.UID;
		this.nickname.string = data.username;
		this.phone.string = data.phone;
		this.email.string = data.email;
		this.cmt.string = data.cmt;
		this.red.string = Helper.numberWithCommas(data.red);
		this.xu.string = Helper.numberWithCommas(data.xu);
		this.ketsat.string = Helper.numberWithCommas(data.ketSat);

		this.thuong.string = Helper.numberWithCommas(data.thuong);
		this.redPlay.string = Helper.numberWithCommas(data.redPlay);
		this.redWin.string = Helper.numberWithCommas(data.redWin);
		this.redLost.string = Helper.numberWithCommas(data.redLost);
		this.redHu.string = Helper.numberWithCommas(data.hu);
		this.xuPlay.string = Helper.numberWithCommas(data.xuPlay);
		this.xuWin.string = Helper.numberWithCommas(data.xuWin);
		this.xuLost.string = Helper.numberWithCommas(data.xuLost);
		this.xuHu.string = Helper.numberWithCommas(data.xuHu);
		var redLai = data.redWin - data.redLost;
		var xuLai = data.xuWin - data.xuLost;

		this.redLai.string = (redLai < 0 ? '-' : '+') + Helper.numberWithCommas(Math.abs(redLai) >> 0);
		this.xuLai.string = (xuLai < 0 ? '-' : '+') + Helper.numberWithCommas(Math.abs(xuLai) >> 0);

		this.joinedOn.string = Helper.getStringDateByTime(data.joinedOn);

		this.vipHT.string = Helper.numberWithCommas(((data.redPlay - data.lastVip) / 100000) >> 0);
		this.vipTich.string = Helper.numberWithCommas(data.vip);
		//最后登陆了
		this.lastLogin.string = Helper.getStringDateByTime(data.lastLogin);
		//console.log("lastLogin", lastLogin)
		//this.regDate.string = data.UID;
		//this.lastLogin.string = data.UID;
	},

	onInfoTX: function (data) {
		var tRedLai = data.tWinRed - data.tLostRed;
		this.TX_Red_Win.string = Helper.numberWithCommas(data.tWinRed);
		this.TX_Red_Lost.string = Helper.numberWithCommas(data.tLostRed);
		this.TX_Red_Lai.string = (tRedLai < 0 ? '-' : '+') + Helper.numberWithCommas(Math.abs(tRedLai) >> 0);
		this.TX_Red_DWinH.string = data.tLineWinRedH;
		this.TX_Red_DWin.string = data.tLineWinRed;
		this.TX_Red_DLostH.string = data.tLineLostRedH;
		this.TX_Red_DLost.string = data.tLineLostRed;

		this.TX_Red_Play.string = Helper.numberWithCommas(data.tRedPlay);

		var tXuLai = data.tWinXu - data.tLostXu;
		this.TX_Xu_Win.string = Helper.numberWithCommas(data.tWinXu);
		this.TX_Xu_Lost.string = Helper.numberWithCommas(data.tLostXu);
		this.TX_Xu_Lai.string = (tXuLai < 0 ? '-' : '+') + Helper.numberWithCommas(Math.abs(tXuLai) >> 0);
		this.TX_Xu_DWinH.string = data.tLineWinXuH;
		this.TX_Xu_DWin.string = data.tLineWinXu;
		this.TX_Xu_DLostH.string = data.tLineLostXuH;
		this.TX_Xu_DLost.string = data.tLineLostXu;

		this.TX_Xu_Play.string = Helper.numberWithCommas(data.tXuPlay);

		var cRedLai = data.cWinRed - data.cLostRed;
		this.CL_Red_Win.string = Helper.numberWithCommas(data.cWinRed);
		this.CL_Red_Lost.string = Helper.numberWithCommas(data.cLostRed);
		this.CL_Red_Lai.string = (cRedLai < 0 ? '-' : '+') + Helper.numberWithCommas(Math.abs(cRedLai) >> 0);
		this.CL_Red_DWinH.string = data.cLineWinRedH;
		this.CL_Red_DWin.string = data.cLineWinRed;
		this.CL_Red_DLostH.string = data.cLineLostRedH;
		this.CL_Red_DLost.string = data.cLineLostRed;

		this.CL_Red_Play.string = Helper.numberWithCommas(data.cRedPlay);

		var cXuLai = data.cWinXu - data.cLostXu;
		this.CL_Xu_Win.string = Helper.numberWithCommas(data.cWinXu);
		this.CL_Xu_Lost.string = Helper.numberWithCommas(data.cLostXu);
		this.CL_Xu_Lai.string = (cXuLai < 0 ? '-' : '+') + Helper.numberWithCommas(Math.abs(cXuLai) >> 0);
		this.CL_Xu_DWinH.string = data.cLineWinXuH;
		this.CL_Xu_DWin.string = data.cLineWinXu;
		this.CL_Xu_DLostH.string = data.cLineLostXuH;
		this.CL_Xu_DLost.string = data.cLineLostXu;
		this.CL_Xu_Play.string = Helper.numberWithCommas(data.cXuPlay);
	},

	onInfoBC: function (data) {
		var redLai = data.red - data.red_lost;
		this.BC_Red_Win.string = Helper.numberWithCommas(data.red);
		this.BC_Red_Lost.string = Helper.numberWithCommas(data.red_lost);
		this.BC_Red_Lai.string = (redLai < 0 ? '-' : '+') + Helper.numberWithCommas(Math.abs(redLai) >> 0);

		var xuLai = data.xu - data.xu_lost;
		this.BC_Xu_Win.string = Helper.numberWithCommas(data.xu);
		this.BC_Xu_Lost.string = Helper.numberWithCommas(data.xu_lost);
		this.BC_Xu_Lai.string = (xuLai < 0 ? '-' : '+') + Helper.numberWithCommas(Math.abs(xuLai) >> 0);
		this.BC_Thuong.string = Helper.numberWithCommas(data.thuong);
	},
	onInfoMPoker: function (data) {
		var redLai = data.win - data.lost;
		this.mPoker_Red_Win.string = Helper.numberWithCommas(data.win);
		this.mPoker_Red_Lost.string = Helper.numberWithCommas(data.lost);
		this.mPoker_Red_Lai.string = (redLai < 0 ? '-' : '+') + Helper.numberWithCommas(Math.abs(redLai) >> 0);

		var xuLai = data.winXu - data.lostXu;
		this.mPoker_Xu_Win.string = Helper.numberWithCommas(data.winXu);
		this.mPoker_Xu_Lost.string = Helper.numberWithCommas(data.lostXu);
		this.mPoker_Xu_Lai.string = (xuLai < 0 ? '-' : '+') + Helper.numberWithCommas(Math.abs(xuLai) >> 0);
		this.mPoker_Thuong.string = Helper.numberWithCommas(data.thuong);
		this.mPoker_Hu.string = data.hu;
		this.mPoker_HuXu.string = data.huXu;
	},
	onInfoM3Cay: function (data) {
		var redLai = data.win - data.lost;
		this.m3Cay_Red_Win.string = Helper.numberWithCommas(data.win);
		this.m3Cay_Red_Lost.string = Helper.numberWithCommas(data.lost);
		this.m3Cay_Red_Lai.string = (redLai < 0 ? '-' : '+') + Helper.numberWithCommas(Math.abs(redLai) >> 0);

		var xuLai = data.winXu - data.lostXu;
		this.m3Cay_Xu_Win.string = Helper.numberWithCommas(data.winXu);
		this.m3Cay_Xu_Lost.string = Helper.numberWithCommas(data.lostXu);
		this.m3Cay_Xu_Lai.string = (xuLai < 0 ? '-' : '+') + Helper.numberWithCommas(Math.abs(xuLai) >> 0);
		this.m3Cay_Thuong.string = Helper.numberWithCommas(data.thuong);
		this.m3Cay_Hu.string = data.hu;
		this.m3Cay_HuXu.string = data.huXu;
	},
	onInfoBigBabol: function (data) {
		var redLai = data.win - data.lost;
		this.bigBabol_Red_Win.string = Helper.numberWithCommas(data.win);
		this.bigBabol_Red_Lost.string = Helper.numberWithCommas(data.lost);
		this.bigBabol_Red_Lai.string = (redLai < 0 ? '-' : '+') + Helper.numberWithCommas(Math.abs(redLai) >> 0);

		var xuLai = data.winXu - data.lostXu;
		this.bigBabol_Xu_Win.string = Helper.numberWithCommas(data.winXu);
		this.bigBabol_Xu_Lost.string = Helper.numberWithCommas(data.lostXu);
		this.bigBabol_Xu_Lai.string = (xuLai < 0 ? '-' : '+') + Helper.numberWithCommas(Math.abs(xuLai) >> 0);
		this.bigBabol_Thuong.string = Helper.numberWithCommas(data.thuong);
		this.bigBabol_Hu.string = data.hu;
		this.bigBabol_HuXu.string = data.huXu;
	},
	onInfoAngrybird: function (data) {
		var redLai = data.win - data.lost;
		this.Angrybird_Red_Win.string = Helper.numberWithCommas(data.win);
		this.Angrybird_Red_Lost.string = Helper.numberWithCommas(data.lost);
		this.Angrybird_Red_Lai.string = (redLai < 0 ? '-' : '+') + Helper.numberWithCommas(Math.abs(redLai) >> 0);

		var xuLai = data.winXu - data.lostXu;
		this.Angrybird_Xu_Win.string = Helper.numberWithCommas(data.winXu);
		this.Angrybird_Xu_Lost.string = Helper.numberWithCommas(data.lostXu);
		this.Angrybird_Xu_Lai.string = (xuLai < 0 ? '-' : '+') + Helper.numberWithCommas(Math.abs(xuLai) >> 0);
		this.Angrybird_Thuong.string = Helper.numberWithCommas(data.thuong);
		this.Angrybird_Hu.string = data.hu;
		this.Angrybird_HuXu.string = data.huXu;
	},
	onInfoUpDow: function (data) {
		var redLai = data.win - data.lost;
		this.upDow_Red_Win.string = Helper.numberWithCommas(data.win);
		this.upDow_Red_Lost.string = Helper.numberWithCommas(data.lost);
		this.upDow_Red_Lai.string = (redLai < 0 ? '-' : '+') + Helper.numberWithCommas(Math.abs(redLai) >> 0);

		var xuLai = data.winXu - data.lostXu;
		this.upDow_Xu_Win.string = Helper.numberWithCommas(data.winXu);
		this.upDow_Xu_Lost.string = Helper.numberWithCommas(data.lostXu);
		this.upDow_Xu_Lai.string = (xuLai < 0 ? '-' : '+') + Helper.numberWithCommas(Math.abs(xuLai) >> 0);
		this.upDow_Thuong.string = Helper.numberWithCommas(data.thuong);
		this.upDow_Hu.string = data.hu;
		this.upDow_HuXu.string = data.huXu;
	},
	onInfoVQR: function (data) {
		var redLai = data.win - data.lost;
		this.VQR_Red_Win.string = Helper.numberWithCommas(data.win);
		this.VQR_Red_Lost.string = Helper.numberWithCommas(data.lost);
		this.VQR_Red_Lai.string = (redLai < 0 ? '-' : '+') + Helper.numberWithCommas(Math.abs(redLai) >> 0);

		var xuLai = data.winXu - data.lostXu;
		this.VQR_Xu_Win.string = Helper.numberWithCommas(data.winXu);
		this.VQR_Xu_Lost.string = Helper.numberWithCommas(data.lostXu);
		this.VQR_Xu_Lai.string = (xuLai < 0 ? '-' : '+') + Helper.numberWithCommas(Math.abs(xuLai) >> 0);
		this.VQR_Thuong.string = Helper.numberWithCommas(data.thuong);
		this.VQR_Hu.string = data.hu;
		this.VQR_HuXu.string = data.huXu;
	},

	onInfoCandy: function (data) {
		var redLai = data.win - data.lost;
		this.Candy_Red_Win.string = Helper.numberWithCommas(data.win);
		this.Candy_Red_Lost.string = Helper.numberWithCommas(data.lost);
		this.Candy_Red_Lai.string = (redLai < 0 ? '-' : '+') + Helper.numberWithCommas(Math.abs(redLai) >> 0);

		var xuLai = data.winXu - data.lostXu;
		this.Candy_Xu_Win.string = Helper.numberWithCommas(data.winXu);
		this.Candy_Xu_Lost.string = Helper.numberWithCommas(data.lostXu);
		this.Candy_Xu_Lai.string = (xuLai < 0 ? '-' : '+') + Helper.numberWithCommas(Math.abs(xuLai) >> 0);
		this.Candy_Thuong.string = Helper.numberWithCommas(data.thuong);
		this.Candy_Hu.string = data.hu;
		this.Candy_HuXu.string = data.huXu;
	},

	onInfoLong: function (data) {
		var redLai = data.win - data.lost;
		this.Long_Red_Win.string = Helper.numberWithCommas(data.win);
		this.Long_Red_Lost.string = Helper.numberWithCommas(data.lost);
		this.Long_Red_Lai.string = (redLai < 0 ? '-' : '+') + Helper.numberWithCommas(Math.abs(redLai) >> 0);

		var xuLai = data.winXu - data.lostXu;
		this.Long_Xu_Win.string = Helper.numberWithCommas(data.winXu);
		this.Long_Xu_Lost.string = Helper.numberWithCommas(data.lostXu);
		this.Long_Xu_Lai.string = (xuLai < 0 ? '-' : '+') + Helper.numberWithCommas(Math.abs(xuLai) >> 0);
		this.Long_Thuong.string = Helper.numberWithCommas(data.thuong);
		this.Long_Hu.string = data.hu;
		this.Long_HuXu.string = data.huXu;
	},
});
