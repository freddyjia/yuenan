
cc.Class({
    extends: cc.Component,

    properties: {
        header: {
            default: null,
            type: cc.Node,
        },
        body: {
            default: null,
            type: cc.Node,
        },
        nickname: {
            default: null,
            type: cc.EditBox,
        },
        renickname: {
            default: null,
            type: cc.EditBox,
        },
        red: {
            default: null,
            type: cc.EditBox,
        },
        messenger: {
            default: null,
            type: cc.EditBox,
        },
        otp: {
            default: null,
            type: cc.EditBox,
        },
        rednhan: {
            default: null,
            type: cc.Label,
        },
        scrollview: {
            default: null,
            type: cc.ScrollView,
        },
    },
    init(){
        var self = this;
        this.isLoaded = false;
        this.editboxs = [this.SoThe, this.SoSeri];
        this.keyHandle = function(t) {
            return t.keyCode === cc.macro.KEY.tab ? (self.isTop() && self.changeNextFocusEditBox(),
                t.preventDefault && t.preventDefault(),
                !1) : t.keyCode === cc.macro.KEY.enter ? (BrowserUtil.focusGame(), self.onNapClick(),
                t.preventDefault && t.preventDefault(),
                !1) : void 0
        }
        Promise.all(this.header.children.map(function(obj) {
            return obj.getComponent('itemContentMenu');
        }))
        .then(result => {
            this.header = result;
        });
    },

    onSelectHead: function(event, name){
        Promise.all(this.header.map(function(header) {
            if (header.node.name == name) {
                header.select();
            }else{
                header.unselect();
            }
        }));
        Promise.all(this.body.children.map(function(body) {
            if (body.name == name) {
                body.active = true;
            }else{
                body.active = false;
            }
        }));
    },
});
