
cc.Class({
    extends: cc.Component,
    onRemoveClick: function() {
    	this.node.parent.idT.active = false;
        cc.RedT.send({shop:{bank:{napremove:this.node.parent.idT.data._id}}});
    },
});
