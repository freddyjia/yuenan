
cc.Class({
    extends: cc.Component,

    properties: {
        users: cc.Label,
    },
    onEnable: function(){
        this.users.string = cc.RedT.nodePanel.quanLyNguoiDung.QuanLyUInfo.nick.string;
    },
    onRemoveClick: function(){
        cc.RedT.send({users:{remove: cc.RedT.nodePanel.quanLyNguoiDung.QuanLyUEdit.idT}});
    },
});
