
cc.Class({
    extends: cc.Component,

    properties: {
        time:   cc.Label,
        from:   cc.Label,
        to:     cc.Label,
        chuyen: cc.Label,
        nhan:   cc.Label,
        nodeMess: cc.Node,
    },
    showMessage: function() {
        cc.RedT.notice.show({title:"Lời nhắn", text: this.message});
    },
});
