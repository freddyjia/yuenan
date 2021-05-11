
var BrowserUtil = require('BrowserUtil');

cc.Class({
	extends: cc.Component,

	properties: {
		header: {
			default: null,
			type: cc.Node,
		},
		body: {
			default: null,
			type: cc.Node,
		},
		NhanhMang: {
			default: null,
			type: cc.Label,
		},
		MenhGia: {
			default: null,
			type: cc.Label,
		},
		SoThe: {
			default: null,
			type: cc.EditBox,
		},
		SoSeri: {
			default: null,
			type: cc.EditBox,
		},
		moreNhaMang: {
			default: null,
			type: cc.Node,
		},
		moreMenhGia: {
			default: null,
			type: cc.Node,
		},
		scrollviewNhaMang: {
			default: null,
			type: cc.ScrollView,
		},
		scrollviewMenhGia: {
			default: null,
			type: cc.ScrollView,
		},
		bangGia: {
			default: null,
			type: cc.ScrollView,
		},
		prefabLeft: {
			default: null,
			type: cc.Prefab,
		},
		prefabRight: {
			default: null,
			type: cc.Prefab,
		},
	},
	init(){
		var self = this;
		this.isLoaded = false;
		this.editboxs = [this.SoThe, this.SoSeri];
		this.keyHandle = function(t) {
			return t.keyCode === cc.macro.KEY.tab ? (self.isTop() && self.changeNextFocusEditBox(),
				t.preventDefault && t.preventDefault(),
				!1) : t.keyCode === cc.macro.KEY.enter ? (BrowserUtil.focusGame(), self.onNapClick(),
				t.preventDefault && t.preventDefault(),
				!1) : void 0
		}
		Promise.all(this.header.children.map(function(obj) {
			return obj.getComponent('itemContentMenu');
		}))
		.then(result => {
			this.header = result;
		});
	},
	onEnable: function () {
		cc.sys.isBrowser && this.addEvent();
		if(!this.isLoaded) {
			cc.RedT.send({shop:{info_nap: true}})
		}
	},
	onDisable: function () {
		this.moreNhaMang.active = this.moreMenhGia.active = false;
		cc.sys.isBrowser && this.removeEvent();
		this.clean();
	},
	addEvent: function() {
		cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
		for (var t in this.editboxs) {
			BrowserUtil.getHTMLElementByEditBox(this.editboxs[t]).addEventListener("keydown", this.keyHandle, !1)
		}
	},
	removeEvent: function() {
		for (var t in this.editboxs) {
			BrowserUtil.getHTMLElementByEditBox(this.editboxs[t]).removeEventListener("keydown", this.keyHandle, !1)
		}
		cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
	},
	onKeyDown: function (event) {
		switch(event.keyCode) {
			case cc.macro.KEY.tab:
				this.isTop() && this.changeNextFocusEditBox();
				break;
			case cc.macro.KEY.enter:
				this.isTop() && this.onNapClick();
		}
	},
	changeNextFocusEditBox: function() {
		for (var t = !1, e = 0, i = this.editboxs.length; e < i; e++)
			if (BrowserUtil.checkEditBoxFocus(this.editboxs[e])) {
				i <= ++e && (e = 0),
				BrowserUtil.focusEditBox(this.editboxs[e]),
				t = !0;
				break
			}
		!t && 0 < this.editboxs.length && BrowserUtil.focusEditBox(this.editboxs[0])
	},
	isTop: function() {
		return !this.moreNhaMang.active && !this.moreMenhGia.active && !cc.RedT.notice.node.active && !cc.RedT.loading.active;
	},
	clean: function(){
		this.SoThe.string = this.SoSeri.string = '';
	},
	onNapClick: function(){

	},
	onSelectHead: function(event, name){
		Promise.all(this.header.map(function(header) {
			if (header.node.name == name) {
				header.select();
			}else{
				header.unselect();
			}
		}));
		Promise.all(this.body.children.map(function(body) {
			if (body.name == name) {
				body.active = true;
			}else{
				body.active = false;
			}
		}));
	},
	toggleMoreNhaMang: function(){
		this.moreNhaMang.active = !this.moreNhaMang.active;
		this.moreMenhGia.active = !1;
	},
	toggleMoreMenhGia: function(){
		this.moreMenhGia.active = !this.moreMenhGia.active;
	},
	infoSet: function(data, i_arg, i_text, nhamang = false){
		var self = this;
		if (data.length) {
			Promise.all(data.map(function(obj){
				var item = cc.instantiate(self.prefabLeft);
				var componentLeft = item.getComponent('NapRed_itemOne');
				if (type) {
					self.scrollviewNhaMang.content.addChild(item);
				}else{
					self.scrollviewMenhGia.content.addChild(item);
					var itemR = cc.instantiate(self.prefabRight);
					//itemR.getComponent('NapRed_itemTT').init(obj.type, obj.km, obj.red);
					self.bangGia.content.addChild(item);
				}
				return componentLeft;
			}))
			.this(result => {
				this[i_arg] = result;
			})
		}
	},
	onData: function(data){
		if (void 0 !== data.info && !this.isLoaded){
			this.isLoaded = true;
			if (void 0 !== data.nhamang){
				this.infoSet(data.nhamang, "nhamangList", "NhanhMang", true);
			}
			if (void 0 !== data.menhgia){
				this.infoSet(data.menhgia, "menhgiaList", "MenhGia");
			}
		}
	},
});
