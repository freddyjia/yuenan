
cc.Class({
    extends: cc.Component,

    properties: {
        time: {
            default: null,
            type: cc.Label
        },
        nickname: {
            default: null,
            type: cc.Label
        },
        nhamang: {
            default: null,
            type: cc.Label
        },
        menhgia: {
            default: null,
            type: cc.Label
        },
        danhan: {
            default: null,
            type: cc.Label
        },
        status: {
            default: null,
            type: cc.Label
        },
    },
    init: function(obj){
        this.controll = obj;
    },
    onInfoClick: function(){
        this.controll.getInfo(this);
        this.controll.onSelectT(null, 'info');
    },
});
