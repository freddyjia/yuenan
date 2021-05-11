
cc.Class({
	extends: cc.Component,

	properties: {
		redT: cc.Node,
		redX: cc.Node,

		redC: cc.Node,
		redL: cc.Node,

		xuT: cc.Node,
		xuX: cc.Node,

		xuC: cc.Node,
		xuL: cc.Node,

		content:  cc.Node,
		itemCuoc: cc.Prefab,

	},
	onLoad () {},
	selecList: function(e, name){
		Promise.all(this.content.children.map(function(obj){
			if (obj.name == name) {
				obj.active = true;
			}else{
				obj.active = false;
			}
		}));
	},
	setData: function(data) {
		this.resetData();
		if (data.length) {
			data.reverse();
			var self = this;
			Promise.all(data.map(function(obj){
				var item = cc.instantiate(self.itemCuoc);
				item = item.getComponent('TaiXiu_itemCuoc');
				item.setData(obj);
				if (obj.taixiu == true && obj.red == true){           // Red Tài Xỉu
					if (obj.select) {
						// Tài
						self.redT.addChild(item.node);
					}else{
						// Xỉu
						self.redX.addChild(item.node);
					}
				} else if (obj.taixiu == true && obj.red == false) {  // Xu Tài Xỉu
					if (obj.select) {
						// Tài
						self.xuT.addChild(item.node);
					}else{
						// Xỉu
						self.xuX.addChild(item.node);
					}
				} else if (obj.taixiu == false && obj.red == true) {  // Red Chẵn Lẻ
					if (obj.select) {
						// Chẵn
						self.redC.addChild(item.node);
					}else{
						// Lẻ
						self.redL.addChild(item.node);
					}
				} else if (obj.taixiu == false && obj.red == false) { // Xu Chẵn Lẻ
					if (obj.select) {
						// Chẵn
						self.xuC.addChild(item.node);
					}else{
						// Lẻ
						self.xuL.addChild(item.node);
					}
				}
			}));
		}
	},
	resetData: function() {
		this.redT.removeAllChildren();
		this.redX.removeAllChildren();
		this.redC.removeAllChildren();
		this.redL.removeAllChildren();
		this.xuT.removeAllChildren();
		this.xuX.removeAllChildren();
		this.xuC.removeAllChildren();
		this.xuL.removeAllChildren();
	},
});
