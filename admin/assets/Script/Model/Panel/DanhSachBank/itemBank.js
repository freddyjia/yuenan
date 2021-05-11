
cc.Class({
    extends: cc.Component,

    properties: {
        bg:      cc.Node,
        BANK:    cc.Label,
        STK:     cc.Label,
        nameSTK: cc.Label,
        BRANCH:  cc.Label,
    },
    init: function(i, data) {
        this.bg.active = i%2;
        this.idT            = data._id;
        this.BANK.string    = data.bank;
        this.STK.string     = data.number;
        this.nameSTK.string = data.name;
        this.BRANCH.string  = data.branch;
    },
    onRemoveClick: function(event, name) {
        cc.RedT.dialog.showBank(event, 'remove', this.idT);
    },
});
