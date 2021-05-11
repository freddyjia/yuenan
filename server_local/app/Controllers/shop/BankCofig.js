let Bank = require("../../Models/Bank/Bank");
module.exports = function () {
    console.log("添加银行配置")
    Bank.estimatedDocumentCount().exec(function (err, total) {
        if (total == 0) {
            Bank.create({ bank: 'VIB', bankcode: "VIB", number: '62262562111123', name: '张三', branch: "地址---" })
            Bank.create({ bank: 'VPBank', bankcode: "VPB", number: '622625621111123', name: '张三', branch: "地址---" })
            Bank.create({ bank: 'BIDV', bankcode: "BIDV", number: '622625622111123', name: '张三', branch: "地址---" })
            Bank.create({ bank: 'VietinBank', bankcode: "CTG", number: '623262562111123', name: '张三', branch: "地址---" })
            Bank.create({ bank: 'SHB', bankcode: "SHB", number: '622625621115123', name: '张三', branch: "地址---" })
            Bank.create({ bank: 'ABBANK', bankcode: "ABB-K", number: '622625621611123', name: '张三', branch: "地址---" })
            Bank.create({ bank: 'AGRIBANK', bankcode: "AGR", number: '622625672111123', name: '张三', branch: "地址---" })
            Bank.create({ bank: 'Techcom', bankcode: "VCB", number: '6226217562111123', name: '张三', branch: "地址---" })
            Bank.create({ bank: 'ACB', bankcode: "TCB", number: '6226227562111123', name: '张三', branch: "地址---" })
            Bank.create({ bank: 'SCB', bankcode: "SCB", number: '6226237562111123', name: '张三', branch: "地址---" })
            Bank.create({ bank: 'MBBANK', bankcode: "MB", number: '6226427562111123', name: '张三', branch: "地址---" })
            Bank.create({ bank: 'EIB', bankcode: "EIB", number: '6226275562111123', name: '张三', branch: "地址---" })
            Bank.create({ bank: 'STB', bankcode: "STB", number: '62262756211111123', name: '张三', branch: "地址---" })

            Bank.create({ bank: 'DongABank', bankcode: "OCB", number: '62262756122111123', name: '张三', branch: "地址---" })
            Bank.create({ bank: 'GPBank', bankcode: "GPB", number: '62262756211231123', name: '张三', branch: "地址---" })
            Bank.create({ bank: 'Saigonbank', bankcode: "SGB", number: '62262327562111123', name: '张三', branch: "地址---" })
            Bank.create({ bank: 'PG Bank', bankcode: "PGB", number: '622627562123111123', name: '张三', branch: "地址---" })
            Bank.create({ bank: 'Oceanbank', bankcode: "OJB", number: '622627561232111123', name: '张三', branch: "地址---" })
            Bank.create({ bank: 'NamABank', bankcode: "NAB", number: '62262756221111123', name: '张三', branch: "地址---" })
            Bank.create({ bank: 'TPB', bankcode: "TPB", number: '622627562111123123', name: '张三', branch: "地址---" })
            Bank.create({ bank: 'HDB', bankcode: "HDB", number: '622627562112311123', name: '张三', branch: "地址---" })
            Bank.create({ bank: 'VAB', bankcode: "VAB", number: '62262756212111123', name: '张三', branch: "地址---" })
        }
    })
}