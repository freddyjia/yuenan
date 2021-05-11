
var helper = require('Helper');
var auto   = require('dialog_GiftCodeAuto');

cc.Class({
    extends: cc.Component,

    properties: {
        editGift: {
            default: null,
            type: cc.EditBox
        },
        editMid: {
            default: null,
            type: cc.EditBox
        },
        editRed: {
            default: null,
            type: cc.EditBox
        },
        editXu: {
            default: null,
            type: cc.EditBox
        },
        editNgay: {
            default: null,
            type: cc.EditBox
        },
        editThang: {
            default: null,
            type: cc.EditBox
        },
        editNam: {
            default: null,
            type: cc.EditBox
        },
        auto: auto,
    },
    show: function(name, id = null) {
        if(!!id){
            this.idT = id;
        }
        this.node.children.forEach(function(obj){
            if (obj.name === name) {
                obj.active = true;
            }else{
                obj.active = false;
            }
        });
    },
    onData: function(data){
        this.auto.onData(data);
    },
    // Send
    onCheckMid: function() {
        if (helper.isEmpty(this.editMid.string)) {
            cc.RedT.notice.show({title: "GIFT CODE", text: "Yêu cầu nhập mã chung!!"});
        }else{
            cc.RedT.send({giftcode:{checkMid: this.editMid.string}});
        }
    },
    onGetGift: function() {
        cc.RedT.send({giftcode:{get_gift:true}});
    },
    onCreateGift: function() {
        if (helper.isEmpty(this.editGift.string)){
            cc.RedT.notice.show({title: "GIFT CODE", text: "Yêu cầu nhập GiftCode"});
        }else if (helper.isEmpty(this.editRed.string) && helper.isEmpty(this.editXu.string)){
            cc.RedT.notice.show({title: "GIFT CODE", text: "Yêu cầu nhập Red hoặc Xu"});
        }else if (helper.isEmpty(this.editNgay.string) || helper.isEmpty(this.editThang.string) || helper.isEmpty(this.editNam.string)){
            cc.RedT.notice.show({title: "GIFT CODE", text: "Yêu cầu nhập Đúng ngày hết hạn"});
        }else{
            cc.RedT.send({giftcode:{create_gift:{giftcode: this.editGift.string, chung: this.editMid.string, red: this.editRed.string, xu: this.editXu.string, ngay: this.editNgay.string, thang: this.editThang.string, nam: this.editNam.string}}});
        }
    },
    onRemoveClick: function() {
        cc.RedT.send({giftcode:{remove: this.idT}});
    },
});
