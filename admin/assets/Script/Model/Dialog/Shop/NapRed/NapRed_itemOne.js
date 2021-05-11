
cc.Class({
    extends: cc.Component,

    properties: {
    	background: {
            default: null,
            type: cc.Node,
        },
        text: {
            default: null,
            type: cc.Label,
        },
    },

    init:function(obj, i_arg, i_text, text) {
    	this.controll    = obj;
    	this.local_arg   = i_arg;
    	this.local_text  = i_text;
        this.text.string = text;
    },
    onClickChanger: function(){
    	cc.RedT.audio.playClick();
    	var self = this;
    	this.controll[this.local_text].string = this.text;
    	Promise.all(this.this.controll[this.local_arg].map(function(obj){
    		if (obj == self) {
    			obj.onSelect()
    		}else{
    			obj.unSelect()
    		}
    	}))
    },
    onSelect: function(){
    	this.nodeUnSelect.active = true;
    	this.node.pauseSystemEvents();
    },
    unSelect: function(){
    	this.nodeUnSelect.active = false;
    	this.node.resumeSystemEvents();
    },
});
