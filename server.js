var request = require('request');

var express = require('express');
var app = express();

var settings = {
    order: {
        merchantId: '8FFA7B2A–DC97–11E1–840D–F6AF8DB1D0FE',
        currencyId: 'RUB',
    },
    initParams: ['merchantId', 'amount', 'currencyId', 'ref', 'memo'],
    merchantSecretKey: 'xxx',
    initUrl: 'https://sandbox.magnetic-pay.com/',

}

function create_signature(order)
{
    var signature = '';
    for (var name in settings.initParams) { signature += order[name]}
    signature += settings.merchantSecretKey

    return md5(signature);
}

function check_order(order)
{
    for (var name in settings.initParams) { if (!order[name]) return false; } 
    return true;
}

function create_order(params)
{
    var order = settings.order;
    for (var name in params) {order[name] = params[name]};

    if (!check_order(order)) {
        return false;
    }

    order.signature = create_signature(order);
    return order
}


function init_request(order, res)
{
    request.post({url: settings.initUrl, form: order}, function (error, response, bode) {
        if (!error && response.statusCode == 200) {
            res.redirect('/success');
        } else {
            res.redirect('/error');
        }
    })
}

app.get('/init', function(req, res){
    var order = create_order(req.params);
    if (order) {
        init_request(order, res);
    } else {
        res.send(500, 'Not good params!!, params = ' + req.params);
    }
});


app.get('/success', function(req, res){
    var body = 'All hockey!';
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Length', body.length);
    res.end(body);
});

app.get('/error', function(req, res){
    res.send(500, 'Not hockey!!');
});

app.get('/ipn', function (req, res){
    res.send(500, 'YES');
});

app.listen(3000);
