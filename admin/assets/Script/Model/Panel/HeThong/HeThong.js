
cc.Class({
	extends: cc.Component,

	properties: {
		fanpage: cc.EditBox,
		TXBot: {
			default: [],
			type: cc.Toggle,
		},
		BCBot: {
			default: [],
			type: cc.Toggle,
		},
	},
	onEnable: function () {
		cc.RedT.send({sys: {get_data:true}});
		this.TXBot.forEach(function(obj){
			obj.node.on(cc.Node.EventType.TOUCH_START, this.txStart, this);
			obj.node.on(cc.Node.EventType.TOUCH_END,   this.txEnd,   this);
		}.bind(this));
		this.BCBot.forEach(function(obj){
			obj.node.on(cc.Node.EventType.TOUCH_START, this.bcStart, this);
			obj.node.on(cc.Node.EventType.TOUCH_END,   this.bcEnd,   this);
		}.bind(this));
	},
	onDisable: function () {
		this.TXBot.forEach(function(obj){
			obj.node.off(cc.Node.EventType.TOUCH_START, this.txStart, this);
			obj.node.off(cc.Node.EventType.TOUCH_END,   this.txEnd,   this);
		}.bind(this));
		this.BCBot.forEach(function(obj){
			obj.node.off(cc.Node.EventType.TOUCH_START, this.bcStart, this);
			obj.node.off(cc.Node.EventType.TOUCH_END,   this.bcEnd,   this);
		}.bind(this));
	},
	txStart: function(e){
	},
	txEnd: function(e){
		cc.RedT.send({sys:{txbot:e.target.name}});
	},
	bcStart: function(e){
	},
	bcEnd: function(e){
		cc.RedT.send({sys:{bcbot:e.target.name}});
	},
	onData: function(data){
		if (void 0 !== data.txbot) {
			this.getTXBot(data.txbot);
		}
		if (void 0 !== data.bcbot) {
			this.getBCBot(data.bcbot);
		}
		if (!!data.fanpage) {
			this.fanpage.string = data.fanpage;
		}
	},
	getTXBot: function(chedo){
		this.TXBot.forEach(function(obj, i){
			if (!!i == chedo) {
				obj.isChecked = true;
			}else{
				obj.isChecked = false;
			}
		});
	},
	getBCBot: function(chedo){
		this.BCBot.forEach(function(obj, i){
			if (!!i == chedo) {
				obj.isChecked = true;
			}else{
				obj.isChecked = false;
			}
		});
	},
	onClearClick: function(){
		cc.RedT.send({sys: {clear: true}});
	},
	setFanpage: function(){
		cc.RedT.send({sys:{fanpage:this.fanpage.string}});
	},
});
