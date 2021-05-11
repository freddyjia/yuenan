
cc.Class({
    extends: cc.Component,

    properties: {
        nodeButton: {
            default: null,
            type: cc.Node,
        },
        title: {
            default: null,
            type: cc.Label,
        },
        text: {
            default: null,
            type: cc.Label,
        },
        button: {
            default: null,
            type: cc.Label,
        },
    },
    onDisable: function () {
        this.clean();
    },
    show: function(data) {
        this.node.active = true;
        if (void 0 !== data.title) {
            this.title.string = data.title;
        }
        if (void 0 !== data.text) {
            this.text.string = data.text;
        }
        if (void 0 !== data.button) {
            this.text.node.y   = 16;
            this.type          = data.button.type;
            this.button.string = data.button.text;
        }else{
            this.text.node.y = -16;
        }
    },
    close: function(){
        cc.RedT.audio.playUnClick();
        this.node.active = false;
    },
    onClickButton: function(){
        //switch(this.type) {
        //    case 'dang_ky_otp':
        //}
    },
    clean: function(){
        this.title.string = this.text.string = this.button.string = '';
    },
});
