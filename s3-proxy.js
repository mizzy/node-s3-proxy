var knox   = require('knox');
var config = require('./config').config();
var http   = require('http');

var s3 = knox.createClient({
    key:    config.key,
    secret: config.secret,
    bucket: config.bucket,
});

var server = http.createServer(function(req, res) {
    s3.get(req.url).on('response', function(res_from_s3){
        res_from_s3.setEncoding('utf8');
        res_from_s3.on('data', function(chunk){
            res.write(chunk);
        });
        res_from_s3.on('end', function(){ res.end() });
    }).end();
});
                               
server.listen(config.port);
