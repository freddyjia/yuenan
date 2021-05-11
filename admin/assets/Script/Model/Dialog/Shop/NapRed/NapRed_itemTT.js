
cc.Class({
	extends: cc.Component,

	properties: {
		menhgia: {
			default: null,
			type: cc.Label,
		},
		khuyenmai: {
			default: null,
			type: cc.Label,
		},
		red: {
			default: null,
			type: cc.Label,
		},
	},

	init:function(menhgia, khuyenmai, red) {
		this.menhgia.string   = menhgia;
		this.khuyenmai.string = khuyenmai;
		this.red.string       = red;
	},
});
