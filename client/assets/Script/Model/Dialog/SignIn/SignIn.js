
var BrowserUtil = require('BrowserUtil');

cc.Class({
    extends: cc.Component,

    properties: {
        username: {
            default: null,
            type: cc.EditBox,
        },
        password: {
            default: null,
            type: cc.EditBox,
        },
    },
    onLoad() {
        var self = this;
        this.editboxs = [this.username, this.password];
        this.editboxs_i = 0;
        this.keyHandle = function (t) {
            return t.keyCode === cc.macro.KEY.tab ? (self.changeNextFocusEditBox(),
                t.preventDefault && t.preventDefault(),
                !1) : t.keyCode === cc.macro.KEY.enter ? (BrowserUtil.focusGame(), self.onLoginClick(),
                    t.preventDefault && t.preventDefault(),
                    !1) : t.keyCode === cc.macro.KEY.escape ? (cc.RedT.inGame.dialog.onClickBack(),
                        t.preventDefault && t.preventDefault(),
                        !1) : void 0
        }
    },
    onEnable: function () {
        cc.sys.isBrowser && this.addEvent();
        this.node.runAction(cc.RedT.inGame.dialog.actionShow);
    },
    onDisable: function () {
        cc.sys.isBrowser && this.removeEvent();
        this.clean();
        cc.RedT.inGame.dialog.resetSizeDialog(this.node);
    },
    addEvent: function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        for (var t in this.editboxs) {
            BrowserUtil.getHTMLElementByEditBox(this.editboxs[t]).addEventListener("keydown", this.keyHandle, !1)
        }
    },
    removeEvent: function () {
        for (var t in this.editboxs) {
            BrowserUtil.getHTMLElementByEditBox(this.editboxs[t]).removeEventListener("keydown", this.keyHandle, !1)
        }
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },
    onKeyDown: function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.escape:
                this.isTop() && cc.RedT.inGame.dialog.onClickBack();
                break;
            case cc.macro.KEY.tab:
                this.isTop() && this.changeNextFocusEditBox();
                break;
            case cc.macro.KEY.enter:
                this.isTop() && this.onLoginClick();
        }
    },
    changeNextFocusEditBox: function () {
        for (var t = !1, e = 0, i = this.editboxs.length; e < i; e++) {
            if (BrowserUtil.checkEditBoxFocus(this.editboxs[e])) {
                BrowserUtil.focusEditBox(this.editboxs[e]);
                t = !0;
                break
            }
        }
        !t && 0 < this.editboxs.length && BrowserUtil.focusEditBox(this.editboxs[0]);
    },
    isTop: function () {
        return !cc.RedT.inGame.notice.node.active && !cc.RedT.inGame.loading.active;
    },
    clean: function () {
        this.username.string = this.password.string = '';
    },
    onLoginClick: function () {
        var error = null;

        if (this.username.string.length > 32 || this.username.string.length < 3 || this.username.string.match(new RegExp("^[a-zA-Z0-9]+$")) === null)
            error = 'T??n t??i kho???n kh??ng ????ng!!';
        else if (this.password.string.length > 32 || this.password.string.length < 6)
            error = 'M???t kh???u kh??ng ????ng!!';

        if (error) {
            cc.RedT.inGame.notice.show({ title: "????NG NH???P", text: error });
            return;
        };
        cc.RedT.inGame.auth({ authentication: { username: this.username.string, password: this.password.string } });
        //---------------
        var userData = {
            username: this.username.string,
            password: this.password.string

        };
        cc.RedT.userDataBasic = userData;
    },
});
