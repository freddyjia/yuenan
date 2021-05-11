
var Helper = require('Helper');

cc.Class({
    extends: cc.Component,

    properties: {
        time:   cc.Label,
        code:   cc.Label,
        red:    cc.Label,
        xu:     cc.Label,
        status: cc.Label,
        chung:  cc.Label,
        han:    cc.Label,
    },
    remove: function(){
        cc.RedT.dialog.showGiftCode(null, 'Remove', this.data._id);
    },
    setData: function() {
        this.time.string   = Helper.getStringDateByTime(this.data.date);
        this.code.string   = this.data.code;
        this.red.string    = Helper.numberWithCommas(this.data.red);
        this.xu.string     = Helper.numberWithCommas(this.data.xu);
        this.status.string = this.data.uid === void 0 ? 'Còn' : 'Đã nạp'
        this.chung.string  = this.data.type;
        this.han.string    = Helper.getDateByTime(new Date(this.data.todate)-1);
    },
});
