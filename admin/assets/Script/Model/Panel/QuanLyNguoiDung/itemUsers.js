
var helper = require('Helper');

cc.Class({
    extends: cc.Component,

    properties: {
        nodeBot:  cc.Node,
        UID:      cc.Label,
        nickname: cc.Label,
        nick:     cc.Label,
        red:      cc.Label,
        xu:       cc.Label,
        profit:   cc.Label,
        phone:    cc.Label,
    },
    onInfoClick: function() {
        cc.RedT.send({users:{get_info:this.idT}})
        cc.RedT.nodePanel.quanLyNguoiDung.onSelectT(null, 'info', this.idT);
    },
    setData: function(data) {
        this.nodeBot.active  = !!data.type;
        this.idT             = data.id;
        this.UID.string      = data.UID;
        this.nickname.string = data.username;
        this.nick.string     = data.name;
        this.red.string      = helper.numberWithCommas(data.red);
        this.xu.string       = helper.numberWithCommas(data.xu);
        this.profit.string   = (data.profit < 0 ? '-' : '+') + helper.numberWithCommas(Math.abs(data.profit));
        this.phone.string    = data.phone;
    },
});
