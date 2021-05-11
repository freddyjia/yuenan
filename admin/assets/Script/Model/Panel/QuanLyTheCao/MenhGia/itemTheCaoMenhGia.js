
var helper = require('Helper');

cc.Class({
    extends: cc.Component,

    properties: {
        loaiThe: {
            default: null,
            type: cc.Label
        },
        giaTri: {
            default: null,
            type: cc.Label
        },
        NAP: {
            default: null,
            type: cc.Label
        },
        MUA: {
            default: null,
            type: cc.Label
        },
    },
    init: function(data) {
        this.idT = data._id;
        this.loaiThe.string = helper.numberWithCommas(data.name);
        this.giaTri.string  = helper.numberWithCommas(data.values);
        this.NAP.string = data.nap ? "Có" : "";
        this.MUA.string = data.mua ? "Có" : "";
    },
    onClickRemove: function(event, name) {
        cc.RedT.dialog.showQLTheCao(event, name, this.idT);
    },
});
