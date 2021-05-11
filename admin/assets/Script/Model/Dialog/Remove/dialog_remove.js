
cc.Class({
	extends: cc.Component,
	show: function(name, data = null) {
		this.acName = name;
		this.data   = data;
	},
	onRemoveClick: function() {
		var data = {};
		data[this.acName] = this.data;
        cc.RedT.send({shop:{remove:data}});
    },
});
