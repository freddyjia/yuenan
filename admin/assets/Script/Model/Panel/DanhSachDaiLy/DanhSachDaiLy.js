
cc.Class({
    extends: cc.Component,

    properties: {
        scrollview: {
            default: null,
            type: cc.ScrollView
        },
        prefab: {
            default: null,
            type: cc.Prefab
        },
    },
    onEnable: function () {
        cc.RedT.send({shop:{daily:{get_data:true}}});
    },
    dataDaiLy: function(data) {
        this.scrollview.content.destroyAllChildren();
        if (data.length) {
            var self = this;
            Promise.all(data.map(function(argument, index) {
                var item = cc.instantiate(self.prefab);
                var itemComponent = item.getComponent('itemDaiLy');
                itemComponent.init(index, argument);
                self.scrollview.content.addChild(item);
            }))
        }
    },
    onData: function(data) {
        if (void 0 !== data.data) {
            this.dataDaiLy(data.data);
        }
        if (void 0 !== data.remove) {
            cc.RedT.dialog.onBack();
        }
    },
});
