
cc.Class({
    extends: cc.Component,

    properties: {
        huD100: cc.EditBox,
        huP100: cc.EditBox,
        huX100: cc.EditBox,

        huD1000: cc.EditBox,
        huP1000: cc.EditBox,
        huX1000: cc.EditBox,

        huD10000: cc.EditBox,
        huP10000: cc.EditBox,
        huX10000: cc.EditBox,

        date: {
            default: [],
            type: cc.Toggle,
        },
    },
    onEnable: function () {
        cc.RedT.send({mini_poker:{getEvent:true}});
    },
    onData: function(data){
        this.huD100.string   = data['100'].toX;
        this.huP100.string   = data['100'].balans;
        this.huX100.string   = data['100'].x;
        this.huD1000.string  = data['1000'].toX;
        this.huP1000.string  = data['1000'].balans;
        this.huX1000.string  = data['1000'].x;
        this.huD10000.string = data['10000'].toX;
        this.huP10000.string = data['10000'].balans;
        this.huX10000.string = data['10000'].x;

        Promise.all(this.date.map(function(toggle, index){
            toggle.isChecked = data[index];
        }));
    },
    onClickSave: function(){
        cc.RedT.send({mini_poker:{setEvent: {
            "0":  this.date[0].isChecked,
            "1":  this.date[1].isChecked,
            "2":  this.date[2].isChecked,
            "3":  this.date[3].isChecked,
            "4":  this.date[4].isChecked,
            "5":  this.date[5].isChecked,
            "6":  this.date[6].isChecked,
            huD100: this.huD100.string,
            huP100: this.huP100.string,
            huX100: this.huX100.string,
            huD1000: this.huD1000.string,
            huP1000: this.huP1000.string,
            huX1000: this.huX1000.string,
            huD10000: this.huD10000.string,
            huP10000: this.huP10000.string,
            huX10000: this.huX10000.string,
        }}});
    }
});
