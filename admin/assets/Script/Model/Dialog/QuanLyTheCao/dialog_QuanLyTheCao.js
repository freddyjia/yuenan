
var helper = require('Helper');

cc.Class({
    extends: cc.Component,

    properties: {
        editNhaMang: {
            default: null,
            type: cc.EditBox,
        },
        nhaMangCode: cc.EditBox,
        editMenhGia: {
            default: null,
            type: cc.EditBox,
        },
        editRed: {
            default: null,
            type: cc.EditBox,
        },
        nhamang_nap: {
            default: null,
            type: cc.Toggle,
        },
        nhamang_mua: {
            default: null,
            type: cc.Toggle,
        },
        menhgia_nap: {
            default: null,
            type: cc.Toggle,
        },
        menhgia_mua: {
            default: null,
            type: cc.Toggle,
        },
    },
    onDisable(){
        this.clear();
    },
    show: function(name, id = null) {
        if(!!id){
            this.idT = id;
        }
        Promise.all(this.node.children.map(function(obj){
            if (obj.name == name) {
                obj.active = true;
            }else{
                obj.active = false;
            }
        }))
    },

    clear: function(){
        this.editNhaMang.string = this.nhaMangCode.string = this.editMenhGia.string = this.editRed.string = "";
    },
    onChangerMenhGia: function(value){
        value = helper.numberWithCommas(helper.getOnlyNumberInString(value));
        this.editMenhGia.string = value == "0" ? "" : value;
    },
    onChangerRED: function(value){
        value = helper.numberWithCommas(helper.getOnlyNumberInString(value));
        this.editRed.string = value == "0" ? "" : value;
    },
    onAddNhaMang: function(){
        if (helper.isEmpty(this.editNhaMang.string) || helper.isEmpty(this.nhaMangCode.string) || (!this.nhamang_nap.isChecked && !this.nhamang_mua.isChecked)) {
            cc.RedT.notice.show({title: "NHÀ MẠNG", text: "Thông tin không hợp lệ."});
        }else{
            cc.RedT.send({shop:{nhamang:{add:{name: this.editNhaMang.string, value: this.nhaMangCode.string, nap: this.nhamang_nap.isChecked, mua: this.nhamang_mua.isChecked}}}});
        }
    },
    onAddMenhGia: function(){
        if (helper.isEmpty(this.editMenhGia.string) || helper.isEmpty(this.editRed.string) || (!this.menhgia_nap.isChecked && !this.menhgia_mua.isChecked)) {
            cc.RedT.notice.show({title: "MỆNH GIÁ", text: "Thông tin không hợp lệ."});
        }else{
            cc.RedT.send({shop:{menhgia:{add:{name: helper.getOnlyNumberInString(this.editMenhGia.string), values: helper.getOnlyNumberInString(this.editRed.string), nap: this.menhgia_nap.isChecked, mua: this.menhgia_mua.isChecked}}}});
        }
    },
    removeNhaMang: function() {
        cc.RedT.send({shop:{nhamang:{remove:this.idT}}});
    },
    removeMenhGia: function() {
        cc.RedT.send({shop:{menhgia:{remove:this.idT}}});
    },
});
