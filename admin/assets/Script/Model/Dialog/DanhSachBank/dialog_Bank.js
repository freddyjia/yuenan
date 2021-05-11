
var rut = require('dialog_BankRut');

cc.Class({
    extends: cc.Component,
    properties: {
        rut: rut,
    },
    show: function(name, id = null) {
        if(!!id){
            this.node.idT = id;
        }
        Promise.all(this.node.children.map(function(obj){
            if (obj.name == name) {
                obj.active = true;
            }else{
                obj.active = false;
            }
        }))
    },
});
