"use strict";
exports.__esModule = true;
var net = require("net");
var base64 = require('base-64');
var rot = require('rot');
// FLAG-{T3mp0r4_m0r1_t3Mp0r4_muNd15_R3c0rD4}
var port = 30515;
var addr = "challenges.ctfd.io";
var client = net.createConnection(port, addr, function () {
    console.log("connected!");
});
var dataArr = [];
client.on("data", function (data) {
    console.log(data.toString("utf-8"));
    dataArr.push(data.toString("utf-8"));
    if (dataArr.length % 2 === 0) {
        var b64decoded = base64.decode(dataArr[0]);
        var rotdecoded = "";
        for (var i = 0; i < 26; i++) {
            rotdecoded = rot(b64decoded, i);
            if (rotdecoded.includes("-Caesar")) {
                client.write(rotdecoded);
                dataArr = [];
            }
        }
    }
});
