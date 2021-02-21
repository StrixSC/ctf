"use strict";
exports.__esModule = true;
var net = require("net");
var port = 30544;
var addr = "challenges.ctfd.io";
// FLAG-{TH3_B35T_PR0GR4MM1NG_L4NGU4G3_EV3R_M4D3}
var client = net.createConnection(port, addr, function () {
    console.log("connected!");
});
var dataArr = [];
var helloworldCharCodes = [];
var hw = "Hello world!";
for (var i = 0; i < hw.length; i++) {
    helloworldCharCodes.push(hw.charCodeAt(i));
}
console.log("Charcodes:", helloworldCharCodes);
client.on("data", function (data) {
    var strData = data.toString("utf-8");
    console.log(strData);
    dataArr.push(strData);
    if (dataArr.length % 2 === 0) {
        var codes = JSON.parse(dataArr[0]);
        var bfCode_1 = "";
        codes.forEach(function (code, index) {
            var tmp = "";
            while (code != helloworldCharCodes[index]) {
                if (code < helloworldCharCodes[index]) {
                    tmp += "+";
                    code++;
                }
                else if (code > helloworldCharCodes[index]) {
                    tmp += "-";
                    code--;
                }
            }
            if (index != helloworldCharCodes.length - 1) {
                tmp += ".>";
            }
            else
                tmp += ".";
            bfCode_1 += tmp;
        });
        console.log(bfCode_1);
        client.write(bfCode_1);
    }
});
