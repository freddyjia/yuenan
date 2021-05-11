
var helper = require('Helper');

cc.Class({
	extends: cc.Component,

	properties: {
		huouRed: cc.Node,
		huouXu:  cc.Node,

		bauRed: cc.Node,
		bauXu:  cc.Node,

		gaRed: cc.Node,
		gaXu:  cc.Node,

		caRed: cc.Node,
		caXu:  cc.Node,

		cuaRed: cc.Node,
		cuaXu:  cc.Node,

		tomRed: cc.Node,
		tomXu:  cc.Node,

		coitRed: cc.Node,
		coitXu:  cc.Node,

		prefabCuoc: cc.Prefab,

		red:    true,
	},
	changerCoit: function(){
		this.red = !this.red;
		this.coitRed.active = this.huouRed.active = this.bauRed.active = this.gaRed.active = this.caRed.active = this.cuaRed.active = this.tomRed.active = this.red;
		this.coitXu.active  = this.huouXu.active  = this.bauXu.active  = this.gaXu.active  = this.caXu.active  = this.cuaXu.active  = this.tomXu.active  = !this.red;
	},
	onData: function(data) {
		this.resetData();
		var self = this;
		Promise.all(data.map(function(obj){
			if (obj.red) {
				if (obj['0'] > 0) {
					var item = cc.instantiate(self.prefabCuoc);
						item = item.getComponent('BauCua_cuoc_item');
						item.username.string = obj.name;
					item.cuoc.string = helper.numberWithCommas(obj['0']);
					self.huouRed.addChild(item.node);
				}
				if (obj['1'] > 0) {
					var item = cc.instantiate(self.prefabCuoc);
						item = item.getComponent('BauCua_cuoc_item');
						item.username.string = obj.name;
					item.cuoc.string = helper.numberWithCommas(obj['1']);
					self.bauRed.addChild(item.node);
				}
				if (obj['2'] > 0) {
					var item = cc.instantiate(self.prefabCuoc);
						item = item.getComponent('BauCua_cuoc_item');
						item.username.string = obj.name;
					item.cuoc.string = helper.numberWithCommas(obj['2']);
					self.gaRed.addChild(item.node);
				}
				if (obj['3'] > 0) {
					var item = cc.instantiate(self.prefabCuoc);
						item = item.getComponent('BauCua_cuoc_item');
						item.username.string = obj.name;
					item.cuoc.string = helper.numberWithCommas(obj['3']);
					self.caRed.addChild(item.node);
				}
				if (obj['4'] > 0) {
					var item = cc.instantiate(self.prefabCuoc);
						item = item.getComponent('BauCua_cuoc_item');
						item.username.string = obj.name;
					item.cuoc.string = helper.numberWithCommas(obj['4']);
					self.cuaRed.addChild(item.node);
				}
				if (obj['5'] > 0) {
					var item = cc.instantiate(self.prefabCuoc);
						item = item.getComponent('BauCua_cuoc_item');
						item.username.string = obj.name;
					item.cuoc.string = helper.numberWithCommas(obj['5']);
					self.tomRed.addChild(item.node);
				}
			}else{
				if (obj['0'] > 0) {
					var item = cc.instantiate(self.prefabCuoc);
						item = item.getComponent('BauCua_cuoc_item');
						item.username.string = obj.name;
					item.cuoc.string = helper.numberWithCommas(obj['0']);
					self.huouXu.addChild(item.node);
				}
				if (obj['1'] > 0) {
					var item = cc.instantiate(self.prefabCuoc);
						item = item.getComponent('BauCua_cuoc_item');
						item.username.string = obj.name;
					item.cuoc.string = helper.numberWithCommas(obj['1']);
					self.bauXu.addChild(item.node);
				}
				if (obj['2'] > 0) {
					var item = cc.instantiate(self.prefabCuoc);
						item = item.getComponent('BauCua_cuoc_item');
						item.username.string = obj.name;
					item.cuoc.string = helper.numberWithCommas(obj['2']);
					self.gaXu.addChild(item.node);
				}
				if (obj['3'] > 0) {
					var item = cc.instantiate(self.prefabCuoc);
						item = item.getComponent('BauCua_cuoc_item');
						item.username.string = obj.name;
					item.cuoc.string = helper.numberWithCommas(obj['3']);
					self.caXu.addChild(item.node);
				}
				if (obj['4'] > 0) {
					var item = cc.instantiate(self.prefabCuoc);
						item = item.getComponent('BauCua_cuoc_item');
						item.username.string = obj.name;
					item.cuoc.string = helper.numberWithCommas(obj['4']);
					self.cuaXu.addChild(item.node);
				}
				if (obj['5'] > 0) {
					var item = cc.instantiate(self.prefabCuoc);
						item = item.getComponent('BauCua_cuoc_item');
						item.username.string = obj.name;
					item.cuoc.string = helper.numberWithCommas(obj['5']);
					self.tomXu.addChild(item.node);
				}
			}
		}));
	},
	resetData: function(){
		this.huouRed.removeAllChildren();
		this.huouXu.removeAllChildren();
		this.bauRed.removeAllChildren();
		this.bauXu.removeAllChildren();
		this.gaRed.removeAllChildren();
		this.gaXu.removeAllChildren();
		this.caRed.removeAllChildren();
		this.caXu.removeAllChildren();
		this.cuaRed.removeAllChildren();
		this.cuaXu.removeAllChildren();
		this.tomRed.removeAllChildren();
		this.tomXu.removeAllChildren();
	},
});
