
cc.Class({
    extends: cc.Component,

    properties: {
        content:    cc.Node,
        pagination: cc.Node,
        isLoad:     false,
    },

    onLoad () {
        this.pagination = this.pagination.getComponent('Pagination')

        Promise.all(this.content.children.map(function(obj){
            return obj.getComponent('GiftCode_item')
        }))
        .then(values => {
            this.content2 = values;
        })
        this.pagination.init(this);
    },

    onEnable: function () {
        this.get_data()
    },
    onDisable: function () {
        //this.reset()
    },
    reset: function(){
        this.isLoad = false
    },
    get_data: function(page = 1){
        this.isLoad = true
        cc.RedT.send({giftcode: {get_data:{page: page}}})
    },
    onData: function(data){
        if (void 0 !== data.get_data) {
            this.setData(data.get_data)
        }
        if (void 0 !== data.get_gift) {
            cc.RedT.dialog.GiftCode.editGift.string = data.get_gift;
        }
        if (void 0 !== data.get_auto) {
            cc.RedT.dialog.GiftCode.onData(data.get_auto);
        }
    },
    setData: function(data){
        var self = this
        this.pagination.onSet(data.page, data.kmess, data.total)

        this.content2.map(function(obj, i){
            var dataT = data.data[i]
            if (void 0 !== dataT) {
                self.content.children[i].active = true
                obj.data = dataT
                obj.setData()
            }else{
                self.content.children[i].active = false
            }
        })
    },
});
