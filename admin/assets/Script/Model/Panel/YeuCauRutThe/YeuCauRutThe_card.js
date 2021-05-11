
cc.Class({
    extends: cc.Component,

    properties: {
        nhamang: {
            default: null,
            type: cc.Label
        },
        menhgia: {
            default: null,
            type: cc.Label
        },
        maThe: {
            default: null,
            type: cc.Label
        },
        seri: {
            default: null,
            type: cc.Label
        },
        hetHan: {
            default: null,
            type: cc.Label
        },
        inputMaThe: {
            default: null,
            type: cc.EditBox
        },
        inputSeri: {
            default: null,
            type: cc.EditBox
        },
        inputHetHan: {
            default: null,
            type: cc.EditBox
        },
    },
    onDisable: function () {
        this.inputMaThe.string = "";
        this.inputSeri.string = "";
        this.inputHetHan.string = "";
    },
});
