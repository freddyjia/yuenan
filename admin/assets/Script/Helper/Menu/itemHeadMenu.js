
cc.Class({
    extends: cc.Component,

    properties: {
        nodeSelect: {
            default: null,
            type:    cc.Node,
        }
    },
    select: function() {
        this.nodeSelect.active   = true;
        this.node.pauseSystemEvents();
    },
    unselect: function() {
        this.nodeSelect.active   = false;
        this.node.resumeSystemEvents();
    },
});
