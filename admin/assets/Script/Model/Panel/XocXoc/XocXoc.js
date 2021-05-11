
var helper = require('Helper');

cc.Class({
	extends: cc.Component,

	properties: {
		labelChan: cc.Label,
		labelLe:   cc.Label,

		labelRed3:   cc.Label,
		labelRed4:   cc.Label,

		labelWhite3: cc.Label,
		labelWhite4: cc.Label,

		labelChanXu: cc.Label,
		labelLeXu:   cc.Label,

		labelRed3Xu:   cc.Label,
		labelRed4Xu:   cc.Label,

		labelWhite3Xu: cc.Label,
		labelWhite4Xu: cc.Label,

		nodeChan: cc.Node,
		nodeLe:   cc.Node,

		nodeRed3:   cc.Node,
		nodeRed4:   cc.Node,

		nodeWhite3: cc.Node,
		nodeWhite4: cc.Node,

		labelTime:  cc.Label,

		coitRed: cc.Node,
		coitXu:  cc.Node,

		dices: {
			default: [],
			type: cc.Sprite
		},

		iconRed:   cc.SpriteFrame,
		iconWhite: cc.SpriteFrame,
		iconThan:  cc.SpriteFrame,

		selectMore: cc.Node,

		prefabCuoc: cc.Prefab,

		red:     true,
		get_new: false,
	},
	ctor: function(){
		this.selectDice = null;
		this.ingame = null;
	},
	onEnable: function () {
		cc.RedT.send({xocxoc:this.get_new ? {view:true} : {get_new:true, view:true}});
	},
	onDisable: function () {
		cc.RedT.send({xocxoc:{view:false}});
	},
	onData: function(data){
		console.log(data);
		if (!!data.info) {
			this.updateInfo(data.info);
		}
		if (!!data.ingame) {
			this.xocxocIngame(data.ingame);
		}
		if (!!data.dices) {
			this.setDice(data.dices);
		}
		if (!!data.finish) {
			this.finish(data.finish);
		}
		if (!!data.time_remain) {
			this.get_new = true;
			this.time_remain = data.time_remain-1;
			this.playTime();
		}
	},
	changerCoit: function(){
		this.red = !this.red;
		this.coitRed.active = this.red;
		this.coitXu.active  = !this.red;
	},
	updateInfo: function(data){
		this.labelChan.string = helper.numberWithCommas(data.red.chan);
		this.labelLe.string   = helper.numberWithCommas(data.red.le);

		this.labelRed3.string = helper.numberWithCommas(data.red.red3);
		this.labelRed4.string = helper.numberWithCommas(data.red.red4);

		this.labelWhite3.string = helper.numberWithCommas(data.red.white3);
		this.labelWhite4.string = helper.numberWithCommas(data.red.white4);

		this.labelChanXu.string = helper.numberWithCommas(data.xu.chan);
		this.labelLeXu.string   = helper.numberWithCommas(data.xu.le);

		this.labelRed3Xu.string = helper.numberWithCommas(data.xu.red3);
		this.labelRed4Xu.string = helper.numberWithCommas(data.xu.red4);

		this.labelWhite3Xu.string = helper.numberWithCommas(data.xu.white3);
		this.labelWhite4Xu.string = helper.numberWithCommas(data.xu.white4);
	},
	showMore: function(event, data){
		let dice = this.dices[data];
		if (dice === this.selectDice) {
			this.selectMore.active = !this.selectMore.active
		}else{
			this.selectDice = dice;
			this.selectMore.active = true;
			this.selectMore.x = this.selectDice.node.parent.x;
		}
		this.selectDice.data = data;
	},
	onClickDice: function(event, data){
		let MrT = {};
		if ('0' === data) {
			MrT[this.selectDice.data] = false;
			this.selectDice.spriteFrame = this.iconWhite;
		}else{
			MrT[this.selectDice.data] = true;
			this.selectDice.spriteFrame = this.iconRed;
		}
		cc.RedT.send({xocxoc:{set_dice:MrT}});
	},
	xocxocIngame: function(data){
		this.ingame = data;
		this.setIngame();
	},
	setIngame: function(){
		this.resetIngame();
		if (this.red){
			for (let [name, data] of Object.entries(this.ingame.red)) {
				let item = null;
				if (data.chan > 0) {
					item = cc.instantiate(this.prefabCuoc);
					item = item.getComponent('BauCua_cuoc_item');
					item.username.string = name;
					item.cuoc.string = helper.numberWithCommas(data.chan);
					this.nodeChan.addChild(item.node);
				}
				if (data.le > 0) {
					item = cc.instantiate(this.prefabCuoc);
					item = item.getComponent('BauCua_cuoc_item');
					item.username.string = name;
					item.cuoc.string = helper.numberWithCommas(data.le);
					this.nodeLe.addChild(item.node);
				}
				if (data.red3 > 0) {
					item = cc.instantiate(this.prefabCuoc);
					item = item.getComponent('BauCua_cuoc_item');
					item.username.string = name;
					item.cuoc.string = helper.numberWithCommas(data.red3);
					this.nodeRed3.addChild(item.node);
				}
				if (data.red4 > 0) {
					item = cc.instantiate(this.prefabCuoc);
					item = item.getComponent('BauCua_cuoc_item');
					item.username.string = name;
					item.cuoc.string = helper.numberWithCommas(data.red4);
					this.nodeRed4.addChild(item.node);
				}
				if (data.white3 > 0) {
					item = cc.instantiate(this.prefabCuoc);
					item = item.getComponent('BauCua_cuoc_item');
					item.username.string = name;
					item.cuoc.string = helper.numberWithCommas(data.white3);
					this.nodeWhite3.addChild(item.node);
				}
				if (data.white4 > 0) {
					item = cc.instantiate(this.prefabCuoc);
					item = item.getComponent('BauCua_cuoc_item');
					item.username.string = name;
					item.cuoc.string = helper.numberWithCommas(data.white4);
					this.nodeWhite4.addChild(item.node);
				}
			}
		}else{
			for (let [name, data] of Object.entries(this.ingame.xu)) {
				let item = null;
				if (data.chan > 0) {
					item = cc.instantiate(this.prefabCuoc);
					item = item.getComponent('BauCua_cuoc_item');
					item.username.string = name;
					item.cuoc.string = helper.numberWithCommas(data.chan);
					this.nodeChan.addChild(item.node);
				}
				if (data.le > 0) {
					item = cc.instantiate(this.prefabCuoc);
					item = item.getComponent('BauCua_cuoc_item');
					item.username.string = name;
					item.cuoc.string = helper.numberWithCommas(data.le);
					this.nodeLe.addChild(item.node);
				}
				if (data.red3 > 0) {
					item = cc.instantiate(this.prefabCuoc);
					item = item.getComponent('BauCua_cuoc_item');
					item.username.string = name;
					item.cuoc.string = helper.numberWithCommas(data.red3);
					this.nodeRed3.addChild(item.node);
				}
				if (data.red4 > 0) {
					item = cc.instantiate(this.prefabCuoc);
					item = item.getComponent('BauCua_cuoc_item');
					item.username.string = name;
					item.cuoc.string = helper.numberWithCommas(data.red4);
					this.nodeRed4.addChild(item.node);
				}
				if (data.white3 > 0) {
					item = cc.instantiate(this.prefabCuoc);
					item = item.getComponent('BauCua_cuoc_item');
					item.username.string = name;
					item.cuoc.string = helper.numberWithCommas(data.white3);
					this.nodeWhite3.addChild(item.node);
				}
				if (data.white4 > 0) {
					item = cc.instantiate(this.prefabCuoc);
					item = item.getComponent('BauCua_cuoc_item');
					item.username.string = name;
					item.cuoc.string = helper.numberWithCommas(data.white4);
					this.nodeWhite4.addChild(item.node);
				}
			}
		}
	},
	resetIngame: function(){
		this.nodeChan.removeAllChildren();
		this.nodeLe.removeAllChildren();
		this.nodeRed3.removeAllChildren();
		this.nodeRed4.removeAllChildren();
		this.nodeWhite3.removeAllChildren();
		this.nodeWhite4.removeAllChildren();
	},
	finish: function(data){
		this.time_remain = 43;
		this.playTime();
		this.setDice(data);
	},
	setDice: function(data){
		let self = this;
		this.dices.forEach(function(dice, index){
			let red = data[index];
			if (red === 2) {
				dice.spriteFrame = self.iconThan;
			}else{
				if (red) {
					dice.spriteFrame = self.iconRed;
				}else{
					dice.spriteFrame = self.iconWhite;
				}
			}
		});
	},
	resetDice: function(data){
		let self = this;
		this.dices.forEach(function(dice, index){
			dice.spriteFrame = self.iconThan;
		});
	},
	playTime: function(){
		void 0 !== this.timeInterval && clearInterval(this.timeInterval);
		this.timeInterval = setInterval(function(){
			if (this.time_remain > -1) {
				var time = helper.numberPad(this.time_remain, 2);
				this.labelTime.string = time;
				if (this.time_remain < 11) {
					this.labelTime.node.color = cc.Color.RED;
				}else{
					this.labelTime.node.color = cc.Color.WHITE
				}
			}else clearInterval(this.timeInterval);
			this.time_remain--;
		}.bind(this), 1000);
	},
});
