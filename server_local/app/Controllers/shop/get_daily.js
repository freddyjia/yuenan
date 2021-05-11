
var tabDaiLy = require('../../Models/DaiLy');
module.exports = function (client) {
	tabDaiLy.find({}, function (err, daily) {
		console.log("代理列表", daily)
		client.red({ shop: { daily: daily } });
	});
}
