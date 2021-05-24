// StrixSC | Caesar | PolyCTF 20-02-2021

import * as net from "net";
var base64 = require('base-64');
var rot = require('rot');

// FLAG-{T3mp0r4_m0r1_t3Mp0r4_muNd15_R3c0rD4}

const port = 30515;
const addr = "challenges.ctfd.io";


const client = net.createConnection(port, addr, () => {
  console.log("connected!");
});

let dataArr = [];
client.on("data", (data) => {
    console.log(data.toString("utf-8"));
    dataArr.push(data.toString("utf-8"));
    if(dataArr.length % 2 === 0) { 
        let b64decoded = base64.decode(dataArr[0])
        let rotdecoded = "";
        for(let i = 0; i < 26; i++) {
            rotdecoded = rot(b64decoded, i);
            if(rotdecoded.includes("-Caesar")) {
                client.write(rotdecoded);
                dataArr = [];
            }
        }
    }
    
});
