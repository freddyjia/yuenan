
cc.Class({
    extends: cc.Component,

    properties: {
        STT: {
            default: null,
            type: cc.Label
        },
        daiLy: {
            default: null,
            type: cc.Label
        },
        nickname: {
            default: null,
            type: cc.Label
        },
        phone: {
            default: null,
            type: cc.Label
        },
        khuVuc: {
            default: null,
            type: cc.Label
        },
    },
    init: function(i, data) {
        this.idT             = data._id;
        this.STT.string      = i+1;
        this.daiLy.string    = data.name;
        this.nickname.string = data.nickname;
        this.phone.string    = data.phone;
        //this.nickname.string = nickname;
    },
    onRemoveClick: function(event, name) {
    	cc.RedT.dialog.showDaiLy(event, name, this.idT);
    },
});
