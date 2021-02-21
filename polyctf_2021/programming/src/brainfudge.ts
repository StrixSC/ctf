import * as net from "net";
const port = 30544;
const addr = "challenges.ctfd.io";

// FLAG-{TH3_B35T_PR0GR4MM1NG_L4NGU4G3_EV3R_M4D3}

const client = net.createConnection(port, addr, () => {
  console.log("connected!");
});

let dataArr = [];
let helloworldCharCodes: number[] = [];
let hw = "Hello world!";
for (let i = 0; i < hw.length; i++) {
  helloworldCharCodes.push(hw.charCodeAt(i));
}

console.log("Charcodes:", helloworldCharCodes);

client.on("data", (data) => {
  let strData = data.toString("utf-8")
  console.log(strData);
  dataArr.push(strData);
  if (dataArr.length % 2 === 0) {
    let codes = JSON.parse(dataArr[0]);
    let bfCode = "";
    codes.forEach((code, index) => {
      let tmp = "";
      while (code != helloworldCharCodes[index]) {
        if (code < helloworldCharCodes[index]) {
          tmp += "+";
          code++;
        } else if (code > helloworldCharCodes[index]) {
          tmp += "-";
          code--;
        }
      }
      if(index != helloworldCharCodes.length - 1) {
        tmp += ".>"
      } else tmp += "."
      bfCode += tmp;
    });

    console.log(bfCode);
    client.write(bfCode);
  }
});
