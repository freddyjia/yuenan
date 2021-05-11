
var helper = require('Helper');

cc.Class({
    extends: cc.Component,

    properties: {
        UID:   cc.EditBox,
        bank:  cc.EditBox,
        money: cc.EditBox,
        info:  cc.EditBox,
        status: '',
    },
    changerStatus: function(event, data) {
        this.status = data;
    },
    onAddClick: function(){
        if (!!this.UID.string && !!this.bank.string && !!this.money.string && !!this.info.string) {
            cc.RedT.send({shop:{bank:{napAdd:{uid:this.UID.string, bank:this.bank.string, money:helper.getOnlyNumberInString(this.money.string), info:this.info.string, status:this.status}}}});
        }else{
            cc.RedT.notice.show({title:'LỖI', text:'Nhập đầy đủ các thông tin...'});
        }
    },
    onChangerRed: function(value = 0){
        value = helper.numberWithCommas(helper.getOnlyNumberInString(value));
        this.money.string = value == 0 ? "" : value;
    },
});
