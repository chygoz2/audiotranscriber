var express = require('express');
var path = require('path');
var logger = require('morgan');
var AWS = require('aws-sdk');
var multers3 = require("multer-s3");
var multer = require('multer');

var app = express();
var router = express.Router();
AWS.config.loadFromPath("./config.json");

AWS.config.update({
    signatureVersion: 'v4'
});
let filename = '';
var s0 = new AWS.S3({})
var upload = multer({
    storage: multers3({
        s3: s0,
        bucket: 'hng4',
        acl: 'public-read',
        metadata: function(req, file, cb) {
            cb(null, { fieldname: file.fieldname })
        },
        key: function(req, file, cb) {
            filename = Date.now() + file.originalname;
            cb(null, filename);
        }
    })
})

var port = process.env.PORT || 3001;
app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }));

app.post("/upload", upload.any(), (req, res, next) => {
    filename = "https://s3.us-east-2.amazonaws.com/hng4/" + filename
    res.json({
        filename
    });
    console.dir(filename);
})

app.listen(port, () => {
    console.log("Listening on port " + port)
})