
var Helper = require('Helper');

cc.Class({
    extends: cc.Component,

    properties: {
        content: {
            default: null,
            type: cc.Node
        },
        pagination: {
            default: null,
            type: cc.Node
        },
        labelStatus: {
            default: null,
            type: cc.Label
        },
        card: {
            default: null,
            type: cc.Node
        },
        isLoad: false,
    },
    onLoad () {
        this.status = "-1";
        this.statusUpdate = "0";

        this.pagination = this.pagination.getComponent('Pagination');

        Promise.all(this.content.children.map(function(obj){
            return obj.getComponent('YeuCauNapThe_item');
        }))
        .then(data => {
            this.content = data;
        })

        Promise.all(this.card.children.map(function(obj) {
            return obj.getComponent('YeuCauRutThe_card');
        }))
        .then(resulf => {
            this.card = resulf;
        });
        this.pagination.init(this);
    },
    onEnable: function () {
        !this.isLoad && this.get_data()
    },
    get_data: function(page = 1){
        cc.RedT.send({mua_the: {get_data:{status: this.status, page: page}}});
    },
    getInfo: function(item){
        this.item = item;
        this.labelStatus.string     = item.statusT == 0 ? "Chờ Duyệt" : (item.statusT == 1 ? "Thành Công" : "Bị Huỷ");
        this.labelStatus.node.color = item.statusT == 0 ? cc.color(45, 171, 255, 255) : (item.statusT == 1 ? cc.color(0, 255, 71, 255) : cc.color(255, 0, 0, 255));
        cc.RedT.send({mua_the: {get_info: item.idT}});
    },
    onSelectT: function(event, name){
        Promise.all(this.node.children.map(function(argument){
            if (argument.name == name) {
                argument.active = true;
            }else{
                argument.active = false;
            }
        }))
    },
    onData: function(data){
        if (void 0 !== data.get_data) {
            this.setData(data.get_data)
        }
        if (void 0 !== data.get_info) {
            this.info_get(data.get_info)
        }
        if (void 0 !== data.update) {
            this.updateInfo(data.update);
        }
        if (!!data.remove) {
            this.onSelectT(null, 'list');
            this.item.node.active = false;
        }
    },
    updateInfo: function(data){
        var self = this;
        if (this.item.idT == data.cart) {
            this.item.statusT           = data.status;
            this.item.status.string     = data.status == 0 ? "Chờ Duyệt" : (data.status == 1 ? "Thành Công" : "Bị Huỷ");
            this.item.status.node.color = data.status == 0 ? cc.color(45, 171, 255, 255) : (data.status == 1 ? cc.color(0, 255, 71, 255) : cc.color(255, 0, 0, 255));
        }
        this.labelStatus.string     = data.status == 0 ? "Chờ Duyệt" : (data.status == 1 ? "Thành Công" : "Bị Huỷ");
        this.labelStatus.node.color = data.status == 0 ? cc.color(45, 171, 255, 255) : (data.status == 1 ? cc.color(0, 255, 71, 255) : cc.color(255, 0, 0, 255));
        if (void 0 !== data.card) {
            Promise.all(data.card.map(function(d){
                Promise.all(self.card.map(function(obj){
                    if (obj.idT == d.id) {
                        if (void 0 !== d.card.maThe) {
                            obj.maThe.string = d.card.maThe;
                        }
                        if (void 0 !== d.card.seri) {
                            obj.seri.string = d.card.seri;
                        }
                        if (void 0 !== d.card.time){
                            obj.hetHan.string = d.card.time;
                        }
                    }
                }))
            }))
        }
    },
    info_get: function(data){
        var self = this;
        this.cart = data.id;
        Promise.all(this.card.map(function(obj, i){
            var dataT = data.card[i];
            if (void 0 !== dataT) {
                obj.idT            = dataT._id;
                obj.node.active    = true;
                obj.nhamang.string = dataT.nhaMang;
                obj.menhgia.string = Helper.numberWithCommas(dataT.menhGia);
                obj.maThe.string   = dataT.maThe;
                obj.seri.string    = dataT.seri;
                obj.hetHan.string  = dataT.time;
            }else{
                obj.node.active = false
            }
        }));
    },
    setData: function(data){
        var self = this
        this.pagination.onSet(data.page, data.kmess, data.total)
        Promise.all(this.content.map(function(obj, i){
            var dataT = data.data[i];
            if (void 0 !== dataT) {
                obj.init(self);
                obj.node.active     = true;
                obj.idT             = dataT._id;
                obj.statusT         = dataT.status;
                obj.time.string     = Helper.getStringDateByTime(dataT.time);
                obj.nickname.string = dataT.name;
                obj.nhamang.string  = dataT.nhaMang;
                obj.menhgia.string  = Helper.numberWithCommas(dataT.menhGia);
                obj.danhan.string   = dataT.soLuong;
                obj.status.string   = dataT.status == 0 ? "Chờ Duyệt" : (dataT.status == 1 ? "Thành Công" : "Bị Huỷ");
                obj.status.node.color = dataT.status == 0 ? cc.color(45, 171, 255, 255) : (dataT.status == 1 ? cc.color(0, 255, 71, 255) : cc.color(255, 0, 0, 255));
            }else{
                obj.node.active = false
            }
        }))
    },
    changerStatus: function(event, data) {
        if (this.status !== data) {
            this.status = data;
            this.get_data();    
        }
    },
    changerStatusUpdate: function(event, data) {
        this.statusUpdate = data;
    },
    onUpdateClick: function(){
        new Promise((ketqua, loi) => {
            Promise.all(this.card.filter(function(obj){
                return obj.node.active;
            }))
            .then(resulf => {
                Promise.all(resulf.map(function(obj){
                    var temp = {id: obj.idT, card:{}};
                    if (!Helper.isEmpty(obj.inputMaThe.string)) {
                        temp.card = Object.assign(temp.card, {maThe: obj.inputMaThe.string});
                    }
                    if (!Helper.isEmpty(obj.inputSeri.string)) {
                        temp.card = Object.assign(temp.card, {seri: obj.inputSeri.string})
                    }
                    if (!Helper.isEmpty(obj.inputHetHan.string)){
                        temp.card = Object.assign(temp.card, {time: obj.inputHetHan.string})
                    }
                    return temp;
                }))
                .then(card_item => {
                    Promise.all(card_item.filter(function(item){
                        return !!Object.keys(item.card).length;
                    }))
                    .then(card => {
                        ketqua(card);
                    })
                })
            })
        }).then(resulf => {
            var update = {cart: this.cart, status: this.statusUpdate};
            if (!!resulf.length) {
                update = Object.assign(update, {card: resulf});
            }
            cc.RedT.send({mua_the:{update:update}});
        })
    },
    onRemoveClick: function(){
        cc.RedT.dialog.showRemove(event, 'rutthe', this.cart);
    },
});
