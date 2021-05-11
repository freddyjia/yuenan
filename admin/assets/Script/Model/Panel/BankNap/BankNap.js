
cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Node,
        pages:   cc.Prefab,
        status:  '',
        find:    '',
    },
    onLoad () {
        this.pages = cc.instantiate(this.pages);
        this.pages.y = -315;
        this.pages.active = false;
        this.node.addChild(this.pages);
        this.pages = this.pages.getComponent('Pagination');
        this.pages.init(this);

        Promise.all(this.content.children.map(function(argument){
            return argument.getComponent('BankNap_item');
        }))
        .then(resuft => {
            this.content = resuft;
        });
    },
    onEnable: function () {
        this.get_data();
    },
    changerStatus: function(event, data) {
        if (this.status !== data) {
            this.status = data;
            this.get_data();
        }
    },
    get_data: function(page = 1) {
        if (!!this.find) {
            cc.RedT.send({shop:{bank:{nap:{status:this.status, find:this.find, page:page}}}});
        }else{
            cc.RedT.send({shop:{bank:{nap:{status:this.status, page:page}}}});
        }
    },
    onData: function(data){
        let self = this;
        this.pages.onSet(data.page, data.kmess, data.total);
        Promise.all(this.content.map(function(obj, i){
            let dataT = data.data[i];
            if (void 0 !== dataT) {
                obj.init(i, dataT);
                obj.node.active = true;
            }else{
                obj.node.active = false
            }
        }))
    },
});
