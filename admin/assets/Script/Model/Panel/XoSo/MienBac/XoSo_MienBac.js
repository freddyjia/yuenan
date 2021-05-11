
var MienBac_cuoc = require('xsmb_cuoc');
var MienBac_tra  = require('xsmb_trathuong');

cc.Class({
    extends: cc.Component,

    properties: {
        header: cc.Node,
        body:   cc.Node,
        MienBac_cuoc: MienBac_cuoc,
        MienBac_tra:  MienBac_tra,
    },
    onSelectType: function(event) {
        let name = event.target.name;
        this.header.children.forEach(function(obj){
            if (obj.name === name) {
                obj.pauseSystemEvents();
                obj.opacity = 255;
            }else{
                obj.resumeSystemEvents();
                obj.opacity = 99;
            }
        });
        this.body.children.forEach(function(obj){
            if (obj.name === name) {
                obj.active = true;
            }else{
                obj.active = false;
            }
        });
    },
    onData: function(data){
        if (!!data.history) {
            this.MienBac_cuoc.onData(data.history);
        }
        if (!!data.kq) {
            this.MienBac_tra.onData(data.kq);
        }
    },
});
