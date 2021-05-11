
var helper = require('Helper');

cc.Class({
    extends: cc.Component,

    properties: {
        passOld: {
            default: null,
            type: cc.EditBox
        },
        passNew: {
            default: null,
            type: cc.EditBox
        },
        rePassNew: {
            default: null,
            type: cc.EditBox
        },
    },
    onChangerClick: function() {
        if (helper.isEmpty(this.passOld.string) || helper.isEmpty(this.passNew.string) || helper.isEmpty(this.rePassNew.string)) {
            cc.RedT.notice.show({title: "ĐỔI MẬT KHẨU", text: "Không được bỏ trống các thông tin..."});
        }else if (this.passOld.string == this.passNew.string) {
            cc.RedT.notice.show({title: "ĐỔI MẬT KHẨU", text: "Mật Khẩu mới không được trùng với mật khẩu cũ..."});
        }else if (this.passNew.string != this.rePassNew.string) {
            cc.RedT.notice.show({title: "ĐỔI MẬT KHẨU", text: "Mật Khẩu nhập lại không khớp..."});
        }else if (this.passOld.length > 32 || this.passOld.length < 5 || this.passNew.length > 32 || this.passNew.length < 5){
            cc.RedT.notice.show({title: "ĐỔI MẬT KHẨU", text: "Độ dài mật khẩu từ 5 đến 32 ký tự..."});
        }else{
            cc.RedT.send({admin:{doi_pass:{password: this.passOld.string, newPassword: this.passNew.string, newPassword2: this.rePassNew.string}}});
        }
    },
});
