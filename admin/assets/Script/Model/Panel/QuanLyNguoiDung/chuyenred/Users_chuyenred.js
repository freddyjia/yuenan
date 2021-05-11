
var Helper = require('Helper');

cc.Class({
    extends: cc.Component,

    properties: {
        pages:   cc.Prefab,
        content: cc.Node,
    },
    onLoad () {
        var pages = cc.instantiate(this.pages);
        pages.y = -320;
        this.node.addChild(pages);
        this.pages = pages.getComponent('Pagination');

        Promise.all(this.content.children.map(function(obj) {
            return obj.getComponent('Users_chuyenitem');
        }))
        .then(result => {
            this.content = result;
        });

        this.pages.init(this);
    },
    onEnable: function() {
        this.get_data();
    },
    get_data: function(page = 1){
        cc.RedT.send({users:{history:{chuyen:{id: cc.RedT.nodePanel.quanLyNguoiDung.QuanLyUEdit.idT, page: page}}}});
    },
    onData: function(data){
        var self = this;
        this.pages.onSet(data.page, data.kmess, data.total);
        Promise.all(this.content.map(function(obj, index){
            var dataH = data.data[index];
            if (!!dataH) {
                obj.node.active   = true;
                obj.time.string   = Helper.getStringDateByTime(dataH.time);
                obj.from.string   = dataH.from;
                obj.to.string     = dataH.to;
                obj.chuyen.string = Helper.numberWithCommas(dataH.red);
                obj.nhan.string   = Helper.numberWithCommas(dataH.red_c);
                //message
                if (!!dataH.message) {
                    obj.nodeMess.active = true;
                    obj.message = dataH.message;
                }else{
                    obj.message = "";
                    obj.nodeMess.active = false;
                }
            }else{
                obj.node.active = false;
            }
        }));
    }
});
