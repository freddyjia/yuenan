
var BrowserUtil = require('BrowserUtil');

var helper = require('Helper');

cc.Class({
	extends: cc.Component,

	properties: {
		username: {
			default: null,
			type: cc.EditBox,
		},
		newpass: {
			default: null,
			type: cc.EditBox,
		},
		renewpass: {
			default: null,
			type: cc.EditBox,
		},
		otp: {
			default: null,
			type: cc.EditBox,
		},
		captcha: {
			default: null,
			type: cc.EditBox,
		},
		capchaSprite: cc.Sprite,
	},
	onLoad () {
		var self = this;
		this.editboxs = [this.username, this.newpass, this.renewpass, this.captcha];
		this.keyHandle = function(t) {
			return t.keyCode === cc.macro.KEY.tab ? (self.changeNextFocusEditBox(),
				t.preventDefault && t.preventDefault(),
				!1) : t.keyCode === cc.macro.KEY.enter ? (BrowserUtil.focusGame(), self.onForGotClick(),
				t.preventDefault && t.preventDefault(),
				!1) : t.keyCode === cc.macro.KEY.escape ? (cc.RedT.inGame.dialog.onClickBack(),
				t.preventDefault && t.preventDefault(),
				!1) : void 0
		}
	},
	onEnable: function () {
		cc.sys.isBrowser && this.addEvent();
		this.node.runAction(cc.RedT.inGame.dialog.actionShow);
		this.reCaptcha();
	},
	onDisable: function () {
		cc.sys.isBrowser && this.removeEvent();
		this.clean();
		cc.RedT.inGame.dialog.resetSizeDialog(this.node);
	},
	addEvent: function() {
		cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
		for (var t in this.editboxs) {
			BrowserUtil.getHTMLElementByEditBox(this.editboxs[t]).addEventListener("keydown", this.keyHandle, !1)
		}
	},
	removeEvent: function() {
		for (var t in this.editboxs) {
			BrowserUtil.getHTMLElementByEditBox(this.editboxs[t]).removeEventListener("keydown", this.keyHandle, !1)
		}
		cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
	},
	onKeyDown: function (event) {
		switch(event.keyCode) {
			case cc.macro.KEY.escape:
				this.isTop() && cc.RedT.inGame.dialog.onClickBack();
				break;
			case cc.macro.KEY.tab:
				this.isTop() && this.changeNextFocusEditBox();
				break;
			case cc.macro.KEY.enter:
				this.isTop() && this.onForGotClick();
		}
	},
	changeNextFocusEditBox: function() {
		for (var t = !1, e = 0, i = this.editboxs.length; e < i; e++){
            if (BrowserUtil.checkEditBoxFocus(this.editboxs[e])) {
                BrowserUtil.focusEditBox(this.editboxs[e]);
                t = !0;
                break
            }
        }
        !t && 0 < this.editboxs.length && BrowserUtil.focusEditBox(this.editboxs[0]);
	},
	isTop: function() {
		return !cc.RedT.inGame.notice.node.active && !cc.RedT.inGame.loading.active;
	},
	clean: function(){
		this.username.string = this.newpass.string = this.renewpass.string = cc.RedT.code = this.captcha.string = '';
	},
	onForGotClick: function() {
		if (this.username.string.length < 3 || this.username.string.length > 32) {
			cc.RedT.inGame.notice.show({title:"L???I", text:'Vui l??ng nh???p ch??nh x??c t??n t??i kho???n...'});
		} else if (this.username.string.match(new RegExp("^[a-zA-Z0-9]+$")) === null){
			cc.RedT.inGame.notice.show({title:"L???I", text:'T??n t??i kho???n ch??? g???m Ch??? v?? S???!'});
		} else if (this.newpass.string.length < 6 || this.newpass.string.length > 32) {
			cc.RedT.inGame.notice.show({title:"L???I", text:'????? d??i m???t kh???u t???i thi???u 6-32 k?? t???...'});
		} else if (this.newpass.string.length != this.renewpass.string.length) {
			cc.RedT.inGame.notice.show({title:"L???I", text:'Nh???p l???i m???t kh???u kh??ng ????ng...'});
		} else if (cc.RedT.code.length != 4){
			cc.RedT.inGame.notice.show({title:"L???I", text:'M?? OTP kh??ng h???p l???...'});
		} else if (this.captcha.string.length != 4){
			cc.RedT.inGame.notice.show({title:"L???I", text:'Captcha kh??ng ????ng.'});
		}else{
			cc.RedT.send({forgotpass:{iforgot: {name: this.username.string, pass: this.newpass.string, otp: cc.RedT.code, captcha: this.captcha.string}}});
		}
	},
	initCaptcha: function(t) {
		var i = this
		  , o = new Image;
		o.src = t,
		o.width = 150,
		o.height = 50,
		setTimeout(function() {
			var t = new cc.Texture2D;
			t.initWithElement(o),
			t.handleLoadedTexture();
			var e = new cc.SpriteFrame(t);
			i.capchaSprite.spriteFrame = e
		}, 10)
	},
	reCaptcha: function(){
		cc.RedT.send({captcha: 'forgotpass'});
	},
	onClickOTP: function(){
		var username = this.username.string.trim();
		if (this.username.string.length < 3 || this.username.string.length > 32) {
			cc.RedT.inGame.notice.show({title:"L???I", text:'Vui l??ng nh???p ch??nh x??c t??n t??i kho???n...'});
		}else{
			cc.RedT.send({forgotpass:{sendOTP: this.username.string}});
		}
	},
});
