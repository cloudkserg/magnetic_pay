var request = require('request');
var settings = {
    order: {
        merchantId: '8FFA7B2A–DC97–11E1–840D–F6AF8DB1D0FE',
        currencyId: 'RUB'
    },
    merchantSecretKey: 
}


function create_order()
{
    var order = settings
    order.ref = process.argv[2]
    order.amount = process.argv[3]
    order.memo = process.argv[4]
    order.signature =  md5(merchantId + amount + currencyId + ref + memo + merchantSecretKey)

    return order
}


var order = create_order(order)

request.post({url: 'http://192.168.98.223/index.php', order},  function (error, response, body) {
    if (!error && response.statusCode == 200) {
        
    }
})
