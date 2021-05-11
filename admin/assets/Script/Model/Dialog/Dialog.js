
var GiftCode       = require('dialog_GiftCode'),
	quanLyTheCao   = require('dialog_QuanLyTheCao'),
	danhSachDaiLy  = require('dialog_DanhSachDaiLy'),
	EventAngryBird = require('EventAngryBird'),
	EventBigBabol  = require('EventBigBabol'),
	EventMiniPoker = require('EventMiniPoker'),
	Bank           = require('dialog_Bank'),
	Remove         = require('dialog_remove'),
	HistoryTaiXiu  = require('HistoryTaiXiu');

cc.Class({
	extends: cc.Component,
	properties: {
		quanLyTheCao:   quanLyTheCao,
		danhSachDaiLy:  danhSachDaiLy,
		GiftCode:       GiftCode,
		EventAngryBird: EventAngryBird,
		EventBigBabol:  EventBigBabol,
		EventMiniPoker: EventMiniPoker,
		HistoryTaiXiu:  HistoryTaiXiu,
		Bank:           Bank,
		Remove:         Remove,
	},
	init: function() {
		this.actionShow = cc.spawn(cc.scaleTo(0.5, 1).easing(cc.easeBackOut(2.5)), cc.fadeTo(0.5, 255));
		this.objShow    = null;
		this.objTmp     = null;
	},

	onClickBack: function(){
		cc.RedT.audio.playUnClick();
		this.onBack();
	},
	onBack: function(){
		if(this.objShow != null){
			if(void 0 == this.objShow.previous || null == this.objShow.previous){
				this.objShow.active = false;
				this.node.active    = false;
				this.objShow        = null;
			}else{
				this.objTmp              = this.objShow;
				this.objShow             = this.objShow.previous;
				this.objTmp.previous     = null;
				this.objTmp.active       = false;
				this.objShow.active      = true;
				this.objTmp              = null;
			}
		}else{
			this.node.active = false;
		}
	},
	onClosePrevious: function(obj){
		if(void 0 !== obj.previous && null !== obj.previous){
			this.onClosePrevious(obj.previous)
			obj.previous = null
		}
		obj.active = false
	},
	onCloseDialog: function(){
		if(this.objShow != null ){
			if(void 0 == this.objShow.previous || null == this.objShow.previous){
				this.objShow.active = this.node.active = false
				this.objShow        = null
			}else{
				this.onClosePrevious(this.objShow.previous)
				this.objShow.active          = this.node.active = false
				this.objShow.previous        = null
				this.objShow                 = null
			}
		}else{
			this.node.active = false
		}
	},

	resetSizeDialog: function(node){
		node.stopAllActions();
		node.scale   = 0.5;
		node.opacity = 0;
	},

	/**
	 * Function Show Dialog
	*/
	showQLTheCao: function(event, name, id = null){
		this.node.active              = true;
		this.quanLyTheCao.node.active = true;
		this.objShow                  = this.quanLyTheCao.node;
		this.quanLyTheCao.show(name, id);
	},
	showDaiLy: function(event, name, id = null){
		this.node.active               = true;
		this.danhSachDaiLy.node.active = true;
		this.objShow                   = this.danhSachDaiLy.node;
		this.danhSachDaiLy.show(name, id);
	},
	showGiftCode: function(event, name, id = null){
		this.node.active          = true;
		this.GiftCode.node.active = true;
		this.objShow              = this.GiftCode.node;
		this.GiftCode.show(name, id);
	},
	showEventAngribird: function(){
		this.node.active          = true;
		this.EventAngryBird.node.active = true;
		this.objShow              = this.EventAngryBird.node;
	},
	showEventBigBabol: function(){
		this.node.active = this.EventBigBabol.node.active = true;
		this.objShow     = this.EventBigBabol.node;
	},
	showEventMiniPoker: function(){
		this.node.active = this.EventMiniPoker.node.active = true;
		this.objShow     = this.EventMiniPoker.node;
	},
	showHistoryTaiXiu: function(event, taixiu = false){
		this.HistoryTaiXiu.taixiu = !!taixiu;
		this.node.active          = this.HistoryTaiXiu.node.active = true;
		this.objShow              = this.HistoryTaiXiu.node;
	},
	showBank: function(event, name, id = null){
		this.node.active      = true;
		this.Bank.node.active = true;
		this.objShow          = this.Bank.node;
		this.Bank.show(name, id);
	},
	showRemove: function(event, name, data = null){
		this.node.active      = true;
		this.Remove.node.active = true;
		this.objShow          = this.Remove.node;
		this.Remove.show(name, data);
	},
});
