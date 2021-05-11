
var BrowserUtil = require('BrowserUtil');

cc.Class({
    extends: cc.Component,

    properties: {
        NhanhMang: {
            default: null,
            type: cc.Label,
        },
        MenhGia: {
            default: null,
            type: cc.Label,
        },
        editSoLuong: {
            default: null,
            type: cc.EditBox,
        },
        editOTP: {
            default: null,
            type: cc.EditBox,
        },
        moreNhaMang: {
            default: null,
            type: cc.Node,
        },
        moreMenhGia: {
            default: null,
            type: cc.Node,
        },
        scrollviewNhaMang: {
            default: null,
            type: cc.ScrollView,
        },
        scrollviewMenhGia: {
            default: null,
            type: cc.ScrollView,
        },
        bangGia: {
            default: null,
            type: cc.ScrollView,
        },
        prefabLeft: {
            default: null,
            type: cc.Prefab,
        },
        prefabRight: {
            default: null,
            type: cc.Prefab,
        },
    },
    init(){
        var self = this;
        this.isLoaded = false;
        this.editboxs = [this.editSoLuong];
        this.keyHandle = function(t) {
            return t.keyCode === cc.macro.KEY.tab ? (self.isTop() && self.changeNextFocusEditBox(),
                t.preventDefault && t.preventDefault(),
                !1) : t.keyCode === cc.macro.KEY.enter ? (BrowserUtil.focusGame(), self.onClickMua(),
                t.preventDefault && t.preventDefault(),
                !1) : void 0
        }
    },
    onEnable: function () {
        cc.sys.isBrowser && this.addEvent();
        if(!this.isLoaded) {
            cc.RedT.send({shop:{info_mua: true}})
        }
    },
    onDisable: function () {
        this.moreNhaMang.active = this.moreMenhGia.active = false;
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
                this.isTop() && this.onClickMua();
        }
    },
    changeNextFocusEditBox: function() {
        for (var t = !1, e = 0, i = this.editboxs.length; e < i; e++)
            if (BrowserUtil.checkEditBoxFocus(this.editboxs[e])) {
                i <= ++e && (e = 0),
                BrowserUtil.focusEditBox(this.editboxs[e]),
                t = !0;
                break
            }
        !t && 0 < this.editboxs.length && BrowserUtil.focusEditBox(this.editboxs[0])
    },
    isTop: function() {
        return !this.moreNhaMang.active && !this.moreMenhGia.active && !cc.RedT.notice.node.active && !cc.RedT.loading.active;
    },
    clean: function(){
        this.editSoLuong.string = '';
    },
    toggleMoreNhaMang: function(){
        this.moreNhaMang.active = !this.moreNhaMang.active;
        this.moreMenhGia.active = !1;
    },
    toggleMoreMenhGia: function(){
        this.moreMenhGia.active = !this.moreMenhGia.active;
    },

    onData: function(data) {
    },
    onClickMua: function(){
    }
});
