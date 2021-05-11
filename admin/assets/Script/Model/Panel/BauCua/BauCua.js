
var helper = require('Helper');

var inGame = require('BauCua_inGame');

cc.Class({
    extends: cc.Component,

    properties: {
        inGame:  inGame,
    	iconLV: {
        	default: [],
        	type: cc.SpriteFrame
        },
        dices: {
        	default: [],
        	type: cc.Sprite
        },
        red: {
        	default: [],
        	type: cc.Label
        },
        xu: {
        	default: [],
        	type: cc.Label
        },

        nodeTime:    cc.Label,
        nodeSetDice: cc.Node,
        selectDice: "",
        get_new:   false,
        cRed:      true,
    },
    onLoad(){
    	Promise.all(this.dices.map(function(dice){
    		dice.isSet = false;
    	}));
    },
    onEnable: function () {
		cc.RedT.send({baucua: this.get_new ? {view: true} : {get_new: true, view: true}});
	},
	onDisable: function () {
		cc.RedT.send({baucua:{view: false}});
	},
    onClickDice: function (e, value) {
    	if (this.nodeSetDice.active && this.selectDice == value) {
	    	this.nodeSetDice.active = false;
    	}else{
    		this.nodeSetDice.active = true;
    	}
    	this.nodeSetDice.x = e.target.x+3;
    	this.nodeSetDice.y = e.target.y+75;
    	this.selectDice = value;
    },
    onSelectLinhVat: function(e, value){
    	this.nodeSetDice.active = false;
    	this.dices[this.selectDice].spriteFrame = this.iconLV[value];
    	this.dices[this.selectDice].isSet = true;
    	var data = {};
    	data[this.selectDice] = value;
    	cc.RedT.send({baucua:{set_dice: data}});
    },
    onDice: function(dices){
    	var self = this;
    	Promise.all(dices.map(function(dice, i){
	    	self.dices[i].spriteFrame = self.iconLV[dice];
	    }));
    },
    onData: function(data){
    	var self = this;
    	if (void 0 !== data.time_remain) {
			this.get_new = true;
			this.time_remain = data.time_remain;
			this.playTime();
		}
		if (void 0 !== data.dices) {
			this.onDice(data.dices);
		}

        if (void 0 !== data.info) {
            this.onInfo(data.info);
        }

		if (void 0 !== data.finish && this.get_new) {
			this.time_remain  = 72;
			this.playTime();
			this.nodeSetDice.active = false;
			Promise.all(this.dices.map(function(dice){
	    		dice.isSet = false;
	    	}));
		}
        if (void 0 !== data.ingame) {
            this.inGame.onData(data.ingame);
        }
    },
    playTime: function(){
        void 0 !== this.timeInterval && clearInterval(this.timeInterval);
        this.timeInterval = setInterval(function() {
            if (this.time_remain > 61) {
                var time = helper.numberPad(this.time_remain-62, 2);
                this.nodeTime.node.color = cc.Color.RED;
                this.nodeTime.string = helper.numberPad(time, 2);
            }else{
                if (this.time_remain == 61) {
                    this.resetDice();
                }
                if (this.time_remain > 0) {
                    var time = helper.numberPad(this.time_remain-1, 2);
                    this.nodeTime.string = time;
                    this.nodeTime.node.color = cc.Color.WHITE
                }else clearInterval(this.timeInterval);
            }
            this.time_remain--;
        }
        .bind(this), 1000)
    },
    resetDice: function(){
    	var self = this;
    	Promise.all(this.dices.map(function(dice){
    		if (!dice.isSet) {
    			dice.spriteFrame = self.iconLV[6];
    		}
    	}));
    },
    setLogout: function(){
		this.get_new = false;
		clearInterval(this.timeInterval)
	},
    onInfo: function(data){
        this.red[0].string = helper.nFormatter(data.redHuou, 1);
        this.red[1].string = helper.nFormatter(data.redBau,  1);
        this.red[2].string = helper.nFormatter(data.redGa,   1);
        this.red[3].string = helper.nFormatter(data.redCa,   1);
        this.red[4].string = helper.nFormatter(data.redCua,  1);
        this.red[5].string = helper.nFormatter(data.redTom,  1);

        this.xu[0].string = helper.nFormatter(data.xuHuou, 1);
        this.xu[1].string = helper.nFormatter(data.xuBau,  1);
        this.xu[2].string = helper.nFormatter(data.xuGa,   1);
        this.xu[3].string = helper.nFormatter(data.xuCa,   1);
        this.xu[4].string = helper.nFormatter(data.xuCua,  1);
        this.xu[5].string = helper.nFormatter(data.xuTom,  1);
    },
});
