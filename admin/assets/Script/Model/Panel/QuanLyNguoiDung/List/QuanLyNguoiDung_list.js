
var Helper = require('Helper');

cc.Class({
	extends: cc.Component,

	properties: {
		content:    cc.Node,
		pages:      cc.Prefab,
		inputUID:   cc.EditBox,
		inputNick:  cc.EditBox,
		inputName:  cc.EditBox,
		inputPhone: cc.EditBox,
		inputEmail: cc.EditBox,
		moreMacth:  cc.Node,
		nameMacth:   cc.Label,

		inputSort:  '',
		inputMatch: '',
	},
	onLoad () {
		this.pages = cc.instantiate(this.pages);
		this.pages.y = -345;
		this.node.addChild(this.pages);
		this.pages = this.pages.getComponent('Pagination');
		this.pages.init(this);

		Promise.all(this.content.children.map(function(argument){
			return argument.getComponent('itemUsers');
		}))
		.then(resuft => {
			this.content = resuft;
		});
	},
	onEnable: function () {
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
	onClickFind: function(){
		this.get_data();
	},
	get_data: function(page = 1) {
		cc.RedT.send({users: {
			get_users: {
				uid:   this.inputUID.string,
				nick:  this.inputNick.string,
				name:  this.inputName.string,
				phone: this.inputPhone.string,
				email: this.inputEmail.string,
				sort:  this.inputSort,
				macth: this.inputMatch,
				page:  page
			}
		}});
	},
	toggleMacth: function(){
		this.moreMacth.active = !this.moreMacth.active;
	},
	onClickMacth: function(e){
		this.inputMatch = e.target.name;
		var text = e.target.children[0].getComponent(cc.Label);
		this.nameMacth.string = text.string;
	},
	setData: function(data){
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
});
