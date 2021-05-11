
cc.Class({
	extends: cc.Component,

	properties: {
		STT: {
			default: null,
			type: cc.Label
		},
		DaiLy: {
			default: null,
			type: cc.Label
		},
		NICKNAME: {
			default: null,
			type: cc.Label
		},
		Phone: {
			default: null,
			type: cc.Label
		},
		FB: "",
	},
	init: function(obj, data) {
		this.controll = obj;
		// body...
	},
	onChuyenClick: function(){
		cc.RedT.audio.playClick();
		this.controll.selectDaiLy(this);
	},
	onFBClick: function(){
		window.open(this.FB, '_blank');
	},
});
