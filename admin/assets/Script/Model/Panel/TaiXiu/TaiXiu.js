
var helper = require('Helper');
var inGame = require('TaiXiu_inGame');
var dashboard = require('TaiXiu_dashboard');

cc.Class({
	extends: cc.Component,

	properties: {
		inGame:    inGame,
		dashboard: dashboard,
		moreInfo:  cc.Label,

		red_tai_total: cc.Label,
		red_tai_user: cc.Label,
		xu_tai_total: cc.Label,
		xu_tai_user: cc.Label,

		red_xiu_total: cc.Label,
		red_xiu_user: cc.Label,
		xu_xiu_total: cc.Label,
		xu_xiu_user: cc.Label,

		red_chan_total: cc.Label,
		red_chan_user: cc.Label,
		xu_chan_total: cc.Label,
		xu_chan_user: cc.Label,

		red_le_total: cc.Label,
		red_le_user: cc.Label,
		xu_le_total: cc.Label,
		xu_le_user: cc.Label,

		dice1: cc.Sprite,
		dice2: cc.Sprite,
		dice3: cc.Sprite,

		dices: {
			default: [],
			type:    cc.SpriteFrame,
		},

		nodeMore: cc.Node,

		nodeNotice: cc.Node,

		notice: {
			default: null,
			type:    cc.Prefab,
		},

		time:  cc.Label,
		phien: cc.Label,
	},

	onLoad () {
		this.dice = this.dice1;
		this.get_time = false;
		this.dashboard.init();
	},
	onEnable: function () {
		cc.RedT.send({taixiu: this.get_time ? {view: true} : {get_time: true, view: true}});
	},
	onDisable: function () {
		cc.RedT.send({taixiu:{view: false}});
	},
	changerInfo: function(){
		this.node.children[0].active = !this.node.children[0].active;
		this.node.children[1].active = !this.node.children[1].active;
		this.moreInfo.string = this.node.children[1].active ? 'Tổng Quan' : 'Trong Game';
	},
	onData: function(data){
		if (void 0 !== data.time_remain) {
			this.phien.string = "# " + data.phien;
			this.get_time = true;
			this.time_remain = data.time_remain;
			this.playTime();
		}
		if (void 0 !== data.dice) {
			this.onDice(data.dice)
		}
		if (void 0 !== data.finish) {
			this.phien.string = "# " + data.finish.phien+1;
			this.time_remain  = 77;
			this.playTime();
			this.nodeMore.active = false;
		}
		if (void 0 !== data.taixiu) {
			this.red_tai_total.string = helper.numberWithCommas(data.taixiu.red_tai);
			this.red_tai_user.string = data.taixiu.red_player_tai;
			this.xu_tai_total.string = helper.numberWithCommas(data.taixiu.xu_tai);
			this.xu_tai_user.string = data.taixiu.xu_player_tai;

			this.red_xiu_total.string = helper.numberWithCommas(data.taixiu.red_xiu);
			this.red_xiu_user.string = data.taixiu.red_player_xiu;
			this.xu_xiu_total.string = helper.numberWithCommas(data.taixiu.xu_xiu);
			this.xu_xiu_user.string = data.taixiu.xu_player_xiu;
		}
		if (void 0 !== data.chanle) {
			this.red_chan_total.string = helper.numberWithCommas(data.chanle.red_chan);
			this.red_chan_user.string = data.chanle.red_player_chan;
			this.xu_chan_total.string = helper.numberWithCommas(data.chanle.xu_chan);
			this.xu_chan_user.string = data.chanle.xu_player_chan;

			this.red_le_total.string = helper.numberWithCommas(data.chanle.red_le);
			this.red_le_user.string = data.chanle.red_player_le;
			this.xu_le_total.string =helper.numberWithCommas(data.chanle.xu_le);
			this.xu_le_user.string = data.chanle.xu_player_le;
		}

		if (void 0 !== data.list) {
			this.inGame.setData(data.list);
		}

		if (void 0 !== data.dashboard) {
			this.dashboard.setData(data.dashboard);
		}
	},
	playTime:function(){
		void 0 !== this.timeInterval && clearInterval(this.timeInterval);
		this.timeInterval = setInterval(function() {
			if (this.time_remain > 0) {
				this.time.string = "00:" + helper.numberPad(this.time_remain > 61 ? this.time_remain-62 : this.time_remain-1, 2);
				if (this.time_remain > 61)
					this.time.node.color = cc.color(255, 0, 0, 255)
				else{
					if (this.time_remain == 61) {
						this.reset();
					}
					this.time.node.color = cc.Color.WHITE
				}
			}else clearInterval(this.timeInterval);
			this.time_remain--;
		}
		.bind(this), 1000)
	},
	selectDice: function(e, dice) {
		if (this.time_remain < 62) {
			switch(dice){
				case "dice1":
					if (this.dice !== this.dice1 || !this.nodeMore.active) {
						this.nodeMore.active = true;
						this.dice = this.dice1;
					}else{
						this.nodeMore.active = false;
					}
				break;

				case "dice2":
					if (this.dice !== this.dice2 || !this.nodeMore.active) {
						this.nodeMore.active = true;
						this.dice = this.dice2;
					}else{
						this.nodeMore.active = false;
					}
				break;

				case "dice3":
					if (this.dice !== this.dice3 || !this.nodeMore.active) {
						this.nodeMore.active = true;
						this.dice = this.dice3;
					}else{
						this.nodeMore.active = false;
					}
				break;
			}
			this.setMore();
		}
	},
	setMore: function(){
		this.nodeMore.x = this.dice.node.x;
		this.nodeMore.y = this.dice.node.y+66;
	},
	setValue: function(event, value){
		this.dice.spriteFrame = this.dices[value];
		this.dice.node.name   = value;
	},
	setDice: function(){
		this.nodeMore.active = false;
		if (this.time_remain < 62) {
			var dice1 = this.dice1.node.name*1+1,
				dice2 = this.dice2.node.name*1+1,
				dice3 = this.dice3.node.name*1+1;

			if (isNaN(dice1) || isNaN(dice2) || isNaN(dice3)) {
				// Vui lòng chọn kết quả
				var notice = cc.instantiate(this.notice);
				var noticeComponent = notice.getComponent('mini_warning');
				noticeComponent.text.string = "Vui lòng chọn kết quả...";
				this.nodeNotice.addChild(notice);
			}else{
				cc.RedT.send({taixiu:{set_dice: {dice1: dice1, dice2: dice2, dice3: dice3}}});
			}
		}else{
			// Chờ phiên bắt đầu
			var notice = cc.instantiate(this.notice);
			var noticeComponent = notice.getComponent('mini_warning');
			noticeComponent.text.string = "Chờ phiên bắt đầu...";
			this.nodeNotice.addChild(notice);
		}
	},
	onDice:function(data){
		this.dice1.spriteFrame = this.dices[data.dice1 == 0 ? 6 : data.dice1-1];
		this.dice2.spriteFrame = this.dices[data.dice2 == 0 ? 6 : data.dice2-1];
		this.dice3.spriteFrame = this.dices[data.dice3 == 0 ? 6 : data.dice3-1];
	},
	setLogout: function(){
		this.reset();
		this.get_time = false;
		clearInterval(this.timeInterval)
	},
	reset: function(){
		this.inGame.resetData();
		this.red_tai_total.string = this.red_tai_user.string = this.xu_tai_total.string = this.xu_tai_user.string = this.red_xiu_total.string = this.red_xiu_user.string = this.xu_xiu_total.string = this.xu_xiu_user.string = this.red_chan_total.string = this.red_chan_user.string = this.xu_chan_total.string = this.xu_chan_user.string = this.red_le_total.string = this.red_le_user.string = this.xu_le_total.string = this.xu_le_user.string = 0;
		this.dice1.spriteFrame = this.dices[6];
		this.dice2.spriteFrame = this.dices[6];
		this.dice3.spriteFrame = this.dices[6];
		this.dice1.node.name = "RedT";
		this.dice2.node.name = "RedT";
		this.dice3.node.name = "RedT";
	},
});
