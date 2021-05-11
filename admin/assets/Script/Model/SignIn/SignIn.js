
var BrowserUtil = require('BrowserUtil');

cc.Class({
	extends: cc.Component,

	properties: {
		username: {
			default: null,
			type: cc.EditBox
		},
		password: {
			default: null,
			type: cc.EditBox
		},
	},
	onLoad () {
        var self = this;
        this.editboxs = [this.username, this.password];
        this.keyHandle = function(t) {
            return t.keyCode === cc.macro.KEY.tab ? (self.changeNextFocusEditBox(),
                t.preventDefault && t.preventDefault(),
                !1) : t.keyCode === cc.macro.KEY.enter ? (BrowserUtil.focusGame(), self.onSignInClick(),
                t.preventDefault && t.preventDefault(),
                !1) : void 0
        }
    },
	onEnable: function () {
        cc.sys.isBrowser && this.addEvent();
    },
    onDisable: function () {
        cc.sys.isBrowser && this.removeEvent();
        this.clean();
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
            case cc.macro.KEY.tab:
                this.isTop() && this.changeNextFocusEditBox();
                break;
            case cc.macro.KEY.enter:
                this.isTop() && this.onSignInClick();
        }
    },
    changeNextFocusEditBox: function() {
        for (var t = !1, e = 0, i = this.editboxs.length; e < i; e++)
            if (BrowserUtil.checkEditBoxFocus(this.editboxs[e])) {
                BrowserUtil.focusEditBox(this.editboxs[e]),
                t = !0;
                break
            }
        !t && 0 < this.editboxs.length && BrowserUtil.focusEditBox(this.editboxs[0]);
    },
    isTop: function() {
        return !cc.RedT.notice.node.active && !cc.RedT.loading.active;
    },
	clean(){
		this.username.string = this.password.string = '';
	},
	onSignInClick: function() {
		var error = null;

		if (this.username.string.length > 32 || this.username.string.length < 5 || this.username.string.match(new RegExp("^[a-zA-Z0-9]+$")) === null)
			error = 'Tên tài khoản không đúng!!';
		else if (this.password.string.length > 32 || this.password.string.length < 5)
			error = 'Mật khẩu không đúng!!';

		if (error) {
			cc.RedT.notice.show({title:"ĐĂNG NHẬP", text:error});
			return;
		};
		cc.RedT.auth({authentication:{username: this.username.string, password: this.password.string}});
	},
});
