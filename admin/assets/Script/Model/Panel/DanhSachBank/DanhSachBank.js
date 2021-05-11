
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
        cc.RedT.send({shop:{bank:{list:true}}});
    },
    dataBank: function(data) {
        this.scrollview.content.destroyAllChildren();
        if (data.length) {
            var self = this;
            Promise.all(data.map(function(argument, index) {
                var item = cc.instantiate(self.prefab);
                var itemComponent = item.getComponent('itemBank');
                itemComponent.init(index, argument);
                self.scrollview.content.addChild(item);
            }))
        }
    },
    onData: function(data) {
        if (void 0 !== data.data) {
            this.dataBank(data.data);
        }
        if (void 0 !== data.remove) {
            cc.RedT.dialog.onBack();
        }
        if (void 0 !== data.updateRut) {
            cc.RedT.dialog.Bank.rut.onData(data.updateRut);
        }
    },
});
