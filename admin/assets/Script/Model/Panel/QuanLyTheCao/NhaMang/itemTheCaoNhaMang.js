
cc.Class({
    extends: cc.Component,

    properties: {
        nhamang: cc.Label,
        code:    cc.Label,
        NAP:     cc.Label,
        MUA:     cc.Label,
    },
    init: function(data) {
        this.idT = data._id;
        this.nhamang.string = data.name;
        this.code.string = data.value;
        this.NAP.string = data.nap ? "Có" : "";
        this.MUA.string = data.mua ? "Có" : "";
    },
    onClickRemove: function(event, name) {
        cc.RedT.dialog.showQLTheCao(event, name, this.idT);
    },
});
