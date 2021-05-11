
var helper = require('Helper');

cc.Class({
	extends: cc.Component,

	properties: {
		name100:  cc.Label,
		name1k:   cc.Label,
		name10k:  cc.Label,

		play100:  cc.Label,
		play1k:   cc.Label,
		play10k:  cc.Label,

		win100:   cc.Label,
		win1k:    cc.Label,
		win10k:   cc.Label,

		lost100:  cc.Label,
		lost1k:   cc.Label,
		lost10k:  cc.Label,

		no100:    cc.Label,
		no1k:     cc.Label,
		no10k:    cc.Label,

		chedo: {
			default: [],
			type: cc.Toggle,
		},

		input100: cc.EditBox,
		input1k:  cc.EditBox,
		input10k: cc.EditBox,

		content:  cc.Node,
		pages:    cc.Node,
		inputSort: '',
	},
	onLoad: function(){
		Promise.all(this.content.children.map(function(obj){
			return obj.getComponent('BigBabol_item_top');
		}))
		.then(result => {
			this.content = result;
		});

		this.pages = this.pages.getComponent('Pagination');
		this.pages.init(this);
	},
	onEnable: function () {
		cc.RedT.send({angrybird: {get_data:true}});
		this.get_data();
	},
	onDisable: function () {
		this.reset();
	},
	changerSort: function(e, value){
		if (this.inputSort == value) {
			this.inputSort = this.inputSort*1+1;
		}else{
			this.inputSort = value;
		}
		this.get_data();
	},
	reset: function(){
		this.input100.string = this.input1k.string = this.input10k.string = '';
	},
	get_data: function(page = 1) {
		cc.RedT.send({angrybird:{get_top:{sort: this.inputSort, page: page}}});
	},
	onClickSetName: function(e, bet) {
		var name = (bet == '100' ? this.input100.string : (bet == '1000' ? this.input1k.string : this.input10k.string));
		if (name.length < 3) {
			cc.RedT.notice.show({title: 'THẤT BẠI', text:'Tên không đúng...'});
		}else{
			cc.RedT.send({angrybird: {name_hu:{name: name, bet: bet}}});
		}
	},
	onData: function(data){
		if (void 0 !== data.name_hu) {
			if (data.name_hu.bet == '100') {
				this.name100.string = data.name_hu.name
			}else if(data.name_hu.bet == '1000'){
				this.name1k.string = data.name_hu.name
			}else{
				this.name10k.string = data.name_hu.name
			}
		}
		if (!!data.hu) {
			this.dataHU(data.hu);
		}

		if (void 0 !== data.get_top) {
			this.get_top(data.get_top);
		}
		if (void 0 !== data.chedo) {
			this.getCheDo(data.chedo);
		}

		if (!!data.eventData) {
			cc.RedT.dialog.EventAngryBird.onData(data.eventData);
		}
	},
	dataHU: function(data){
		var hu100 = data.filter(function(hu){
			return (hu.type == 100)
		});
		hu100 = hu100[0];

		var hu1000 = data.filter(function(hu){
			return (hu.type == 1000)
		});
		hu1000 = hu1000[0];

		var hu10000 = data.filter(function(hu){
			return (hu.type == 10000)
		});
		hu10000 = hu10000[0];

		this.name100.string = hu100.name;
		this.name1k.string  = hu1000.name;
		this.name10k.string = hu10000.name;

		this.play100.string = helper.numberWithCommas(hu100.redPlay);
		this.play1k.string  = helper.numberWithCommas(hu1000.redPlay);
		this.play10k.string = helper.numberWithCommas(hu10000.redPlay);

		this.win100.string = helper.numberWithCommas(hu100.redWin);
		this.win1k.string  = helper.numberWithCommas(hu1000.redWin);
		this.win10k.string = helper.numberWithCommas(hu10000.redWin);

		this.lost100.string = helper.numberWithCommas(hu100.redLost);
		this.lost1k.string  = helper.numberWithCommas(hu1000.redLost);
		this.lost10k.string = helper.numberWithCommas(hu10000.redLost);

		this.no100.string = helper.numberWithCommas(hu100.hu);
		this.no1k.string  = helper.numberWithCommas(hu1000.hu);
		this.no10k.string = helper.numberWithCommas(hu10000.hu);
	},
	get_top: function(data){
		this.pages.onSet(data.page, data.kmess, data.total);
		Promise.all(this.content.map(function(obj, i){
			var dataT = data.data[i];
			if (void 0 !== dataT) {
				obj.node.active = true;
				obj.setData(dataT);
			}else{
				obj.node.active = false;
			}
		}));
	},
	doiCheDo: function(e, status = null){
		!!status && cc.RedT.send({angrybird:{chedo: e.target.name}});
	},
	getCheDo: function(chedo){
		Promise.all(this.chedo.map(function(obj, i){
			if (i == chedo) {
				obj.isChecked = true;
			}else{
				obj.isChecked = false;
			}
		}));
	},
	onClickEvent: function(){
		cc.RedT.dialog.showEventAngribird();
	},
});
