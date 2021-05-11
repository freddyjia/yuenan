
var Helper = require('Helper');

cc.Class({
	extends: cc.Component,

	properties: {
		content: cc.Node,
		pages:   cc.Prefab,

		nodeRed: cc.Node,
		nodeXu:  cc.Node,

		taixiu:  true,
		red:     true,
	},

	onLoad () {
		this.pages = cc.instantiate(this.pages);
		this.pages.y = -304;
		this.node.addChild(this.pages);
		this.pages = this.pages.getComponent('Pagination');
		this.pages.init(this);

		Promise.all(this.content.children.map(function(argument){
			return argument.getComponent('HistoryTXitem');
		}))
		.then(resuft => {
			this.content = resuft;
		});
	},
	onEnable: function () {
		this.get_data();
	},
	onChangerRed: function(){
		this.red = !this.red;
		this.nodeRed.active = !this.nodeRed.active;
		this.nodeXu.active  = !this.nodeXu.active;
		this.get_data();
	},
	get_data: function(page = 1) {
		cc.RedT.send({users:{history:{taixiu:{id:cc.RedT.nodePanel.quanLyNguoiDung.QuanLyUEdit.idT, taixiu:this.taixiu, red: this.red, page: page}}}});
	},
	onData: function(data){
		var self = this;
		this.pages.onSet(data.page, data.kmess, data.total);
		Promise.all(this.content.map(function(obj, i){
			var dataT = data.data[i];
			if (void 0 !== dataT) {
				obj.node.active  = true;
				obj.time.string  = Helper.getStringDateByTime(dataT.time);
		        obj.phien.string = dataT.phien;
		        obj.dat.string   = self.taixiu ? (dataT.select ? "Tài" : "Xỉu") : (dataT.select ? "Chẵn" : "Lẻ");
		        obj.kq.string    = dataT.dice1 + "-" + dataT.dice2 + "-" + dataT.dice3 + "  " + (dataT.dice1+dataT.dice2+dataT.dice3);
		        obj.bet.string   = Helper.numberWithCommas(dataT.bet);
		        obj.re.string    = Helper.numberWithCommas(dataT.tralai);
			}else{
				obj.node.active = false;
			}
		}));
	},
});
