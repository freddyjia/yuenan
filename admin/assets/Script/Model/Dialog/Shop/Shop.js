
cc.Class({
	extends: cc.Component,

	properties: {
		header: {
			default: null,
			type:    cc.Node,
		},
		NapRed: {
			default: null,
			type:    cc.Node,
		},
		TieuRed: {
			default: null,
			type:    cc.Node,
		},
		ChuyenRed: {
			default: null,
			type:    cc.Node,
		},
	},
	init(){
		this.NapRed    = this.NapRed.getComponent('NapRed');
		this.TieuRed   = this.TieuRed.getComponent('TieuRed');
		this.ChuyenRed = this.ChuyenRed.getComponent('ChuyenRed');

		this.NapRed.init();
		this.TieuRed.init();
		this.ChuyenRed.init();

		this.body = [this.NapRed, this.TieuRed, this.ChuyenRed];
		Promise.all(this.header.children.map(function(obj) {
			return obj.getComponent('itemHeadMenu');
		}))
		.then(result => {
			this.header = result;
		});
	},
	onSelectHead: function(event, name){
		Promise.all(this.header.map(function(header) {
			if (header.node.name == name) {
				header.select();
			}else{
				header.unselect();
			}
		}));
		Promise.all(this.body.map(function(body) {
			if (body.node.name == name) {
				body.node.active = true;
			}else{
				body.node.active = false;
			}
		}));
	},
	superView:function(name){
		if(name == "NapRed" || name == "ThongTinNapRed" || name == "QuyDinhNapRed"){
			this.onSelectHead(null, "NapRed");
			if (name != "NapRed") this.NapRed.onSelectHead(null, name);
		}else if(name == "TieuRed" || name == "MuaXu" || name == "MuaTheNap"){
			this.onSelectHead(null, "TieuRed");
			if (name != "TieuRed") this.TieuRed.onSelectHead(null, name);
		}
	},
	onData: function(data){
		if (void 0 !== data.nap_red){
			this.NapRed.onData(data.nap_red);
		}
		if (void 0 !== data.mua_the_nap){
			this.TieuRed.MuaTheCao.onData(data.mua_the_nap);
		}
	},
});
