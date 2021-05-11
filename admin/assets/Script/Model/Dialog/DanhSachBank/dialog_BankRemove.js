
cc.Class({
    extends: cc.Component,
    onRemoveClick: function() {
        cc.RedT.send({shop:{bank:{remove:this.node.parent.idT}}});
    },
});
