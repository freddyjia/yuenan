
cc.Class({
	extends: cc.Component,

	properties: {
		coitRed:    cc.Node,
		coitXu:     cc.Node,
		contentTop: cc.Node,

		contentD1: cc.Node,
		contentD2: cc.Node,
		contentD3: cc.Node,
		contentD4: cc.Node,

		prefabDuDay: cc.Prefab,

		pages:      cc.Node,

		inputSort: '',
		red:       true,
	},
	init: function(){
		Promise.all(this.contentTop.children.map(function(obj){
			return obj.getComponent('TaiXiu_dashboard_top');
		}))
		.then(result => {
			this.contentTop = result;
		});

		this.pages = this.pages.getComponent('Pagination');
		this.pages.init(this);
	},
	onLoad () {},
	onEnable: function () {
		this.get_DuDay();
		this.get_data();
	},
	onDisable: function () {
	},
	changerCoit: function(){
		this.red            = !this.red;
		this.coitRed.active = !this.coitRed.active;
		this.coitXu.active  = !this.coitXu.active;
		this.get_DuDay();
		this.get_data();
	},
	changerSort: function(e, value){
		if (this.inputSort == value) {
			this.inputSort = this.inputSort*1+1;
		}else{
			this.inputSort = value;
		}
		this.get_data();
	},
	get_data: function(page = 1) {
		cc.RedT.send({taixiu:{dashboard:{get_top:{red: this.red, sort: this.inputSort, page: page}}}});
	},
	get_DuDay: function(page = 1) {
		cc.RedT.send({taixiu:{dashboard:{view: this.red}}});
	},
	setData: function(data){
		if (void 0 !== data.get_users) {
			this.setDataTop(data.get_users);
		}

		if (void 0 !== data.dTXWin) {
			this.dTXWin(data.dTXWin);
		}
		if (void 0 !== data.dTXLost) {
			this.dTXLost(data.dTXLost);
		}
		if (void 0 !== data.dCLWin) {
			this.dCLWin(data.dCLWin);
		}
		if (void 0 !== data.dCLLost) {
			this.dCLLost(data.dCLLost);
		}
	},
	setDataTop: function(data){
		this.pages.onSet(data.page, data.kmess, data.total);
		Promise.all(this.contentTop.map(function(obj, i){
			var dataT = data.data[i];
			if (void 0 !== dataT) {
				obj.node.active = true;
				obj.setData(dataT);
			}else{
				obj.node.active = false;
			}
		}));
	},
	dTXWin: function(data){
		this.contentD1.removeAllChildren();
		var self = this;
		Promise.all(data.map(function(obj, i){
			var item = cc.instantiate(self.prefabDuDay);
			item     = item.getComponent('TaiXiu_dashboard_day');
			item.username.string = obj.name;
			if (self.red) {
				item.dMax.string = obj.tLineWinRed;
				item.dHT.string  = obj.tLineWinRedH;
			}else{
				item.dMax.string = obj.tLineWinXu;
				item.dHT.string  = obj.tLineWinXuH;
			}
			item.node.children[0].active = i%2;
			self.contentD1.addChild(item.node);
		}))
	},
	dTXLost: function(data){
		this.contentD2.removeAllChildren();
		var self = this;
		Promise.all(data.map(function(obj, i){
			var item = cc.instantiate(self.prefabDuDay);
			item     = item.getComponent('TaiXiu_dashboard_day');
			item.username.string = obj.name;
			if (self.red) {
				item.dMax.string = obj.tLineLostRed;
				item.dHT.string  = obj.tLineLostRedH;
			}else{
				item.dMax.string = obj.tLineLostXu;
				item.dHT.string  = obj.tLineLostXuH;
			}
			item.node.children[0].active = i%2;
			self.contentD2.addChild(item.node);
		}))
	},
	dCLWin: function(data){
		this.contentD3.removeAllChildren();
		var self = this;
		Promise.all(data.map(function(obj, i){
			var item = cc.instantiate(self.prefabDuDay);
			item     = item.getComponent('TaiXiu_dashboard_day');
			item.username.string = obj.name;
			if (self.red) {
				item.dMax.string = obj.cLineWinRed;
				item.dHT.string  = obj.cLineWinRedH;
			}else{
				item.dMax.string = obj.cLineWinXu;
				item.dHT.string  = obj.cLineWinXuH;
			}
			item.node.children[0].active = i%2;
			self.contentD3.addChild(item.node);
		}))
	},
	dCLLost: function(data){
		this.contentD4.removeAllChildren();
		var self = this;
		Promise.all(data.map(function(obj, i){
			var item = cc.instantiate(self.prefabDuDay);
			item     = item.getComponent('TaiXiu_dashboard_day');
			item.username.string = obj.name;
			if (self.red) {
				item.dMax.string = obj.cLineLostRed;
				item.dHT.string  = obj.cLineLostRedH;
			}else{
				item.dMax.string = obj.cLineLostXu;
				item.dHT.string  = obj.cLineLostXuH;
			}
			item.node.children[0].active = i%2;
			self.contentD4.addChild(item.node);
		}))
	},
});
