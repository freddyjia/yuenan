
var BrowserUtil = require('BrowserUtil');
var helper = require('Helper');

cc.Class({
    extends: cc.Component,

    properties: {
        phone: {
            default: null,
            type: cc.EditBox,
        },
        email: {
            default: null,
            type: cc.EditBox,
        },
        cmt: {
            default: null,
            type: cc.EditBox,
        },
        otp: {
            default: null,
            type: cc.EditBox,
        },
        nodeReg: cc.Node,
        nodeInfo: cc.Node,

        labelPhone: cc.Label,
        labelEmail: cc.Label,
        labelCMT: cc.Label,
    },
    onLoad() {
        var self = this;
        this.editboxs = [this.phone, this.email, this.cmt];
        this.keyHandle = function (t) {
            return t.keyCode === cc.macro.KEY.tab ? (self.changeNextFocusEditBox(),
                t.preventDefault && t.preventDefault(),
                !1) : t.keyCode === cc.macro.KEY.enter ? (BrowserUtil.focusGame(), self.onRegClick(),
                    t.preventDefault && t.preventDefault(),
                    !1) : void 0
        }
    },
    onEnable: function () {
        cc.sys.isBrowser && this.nodeReg.active && this.addEvent();
    },
    onDisable: function () {
        cc.sys.isBrowser && this.nodeReg.active && this.removeEvent();
        this.clear();
    },
    addEvent: function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        for (var t in this.editboxs) {
            BrowserUtil.getHTMLElementByEditBox(this.editboxs[t]).addEventListener("keydown", this.keyHandle, !1)
        }
    },
    removeEvent: function () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        for (var t in this.editboxs) {
            BrowserUtil.getHTMLElementByEditBox(this.editboxs[t]).removeEventListener("keydown", this.keyHandle, !1)
        }
    },
    onKeyDown: function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.tab:
                this.isTop() && this.changeNextFocusEditBox();
                break;
            case cc.macro.KEY.enter:
                this.isTop() && this.onRegClick();
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
    onOTPClick: function () {
        if (!helper.checkPhoneValid(this.phone.string)) {
            cc.RedT.inGame.notice.show({ title: 'L???I!', text: 'S??? ??i???n tho???i kh??ng h???p l???.' });
        } else {
            cc.RedT.send({ user: { security: { sendOTP: this.phone.string } } });
        }
    },
    onRegClick: function () {
        if (!helper.checkPhoneValid(this.phone.string) ||
            !helper.validateEmail(this.email.string) ||
            helper.isEmpty(this.cmt.string) ||
            helper.isEmpty(cc.RedT.code) ||
            cc.RedT.code.length != 4 ||
            this.cmt.string.length < 9 ||
            this.cmt.string.length > 12

        ) {
            cc.RedT.inGame.notice.show({ title: 'L???I!', text: 'B???n nh???p kh??ng ????ng th??ng tin' });
        } else {
            // Send
            cc.RedT.send({ user: { security: { regOTP: { phone: this.phone.string, email: this.email.string, cmt: this.cmt.string, otp: cc.RedT.code } } } });
        }
    },
    clear: function () {
        this.phone.string = this.email.string = this.cmt.string = cc.RedT.code = "";
    },
    statusOTP: function (status) {
        this.nodeReg.active = !status;
        this.nodeInfo.active = status;
    },
});
