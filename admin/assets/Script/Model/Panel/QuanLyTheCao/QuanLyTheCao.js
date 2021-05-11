
cc.Class({
	extends: cc.Component,

	properties: {
		scrollviewNhaMang: {
			default: null,
			type: cc.ScrollView
		},
		scrollviewMenhGia: {
			default: null,
			type: cc.ScrollView
		},
		prefabNhaMang: {
			default: null,
			type: cc.Prefab
		},
		prefabMenhGia: {
			default: null,
			type: cc.Prefab
		},
	},
	onEnable: function () {
		cc.RedT.send({shop:{thecao_get: {menhgia: true, nhamang: true}}});
	},
	onNhaMang: function(data){
		this.scrollviewNhaMang.content.destroyAllChildren();
		if (data.length) {
			var self = this;
			Promise.all(data.map(function(argument) {
				var item = cc.instantiate(self.prefabNhaMang);
				var itemComponent = item.getComponent('itemTheCaoNhaMang')
				itemComponent.init(argument);
				self.scrollviewNhaMang.content.addChild(item)
			}))
		}
	},
	onMenhGia: function(data){
		this.scrollviewMenhGia.content.destroyAllChildren();
		if (data.length) {
			var self = this;
			Promise.all(data.map(function(argument) {
				var item = cc.instantiate(self.prefabMenhGia);
				var itemComponent = item.getComponent('itemTheCaoMenhGia')
				itemComponent.init(argument);
				self.scrollviewMenhGia.content.addChild(item)
			}))
		}
	},
	onData: function(data) {
		if (void 0 !== data.nhamang) {
			this.onNhaMang(data.nhamang);
		}
		if (void 0 !== data.menhgia) {
			this.onMenhGia(data.menhgia);
		}
		if (void 0 !== data.remove) {
			cc.RedT.dialog.onBack();
		}
	}
});
