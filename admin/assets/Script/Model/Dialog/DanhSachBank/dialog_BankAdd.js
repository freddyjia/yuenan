
var isEmpty = require('Helper').isEmpty;

cc.Class({
    extends: cc.Component,

    properties: {
        bank:   cc.EditBox,
        number: cc.EditBox,
        nameTk: cc.EditBox,
        branch: cc.EditBox,
    },
    onAddClick: function() {
        if (isEmpty(this.bank.string) || isEmpty(this.number.string) || isEmpty(this.nameTk.string) || isEmpty(this.branch.string)) {
            cc.RedT.notice.show({title: "NGÂN HÀNG", text: "Không được bỏ trống các thông tin..."});
        }else{
            cc.RedT.send({shop:{bank:{add:{bank:this.bank.string, number:this.number.string, name:this.nameTk.string, branch:this.branch.string}}}});
        }
    },
});
