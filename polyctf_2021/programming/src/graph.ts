// StrixSC | Caesar | PolyCTF 20-02-2021

import * as net from "net";
const jsonFix = require('json-fixer')
var litepathfindings = require('lite-pathfindings');
const Graph = require("dijkstra-floydwarshall-graph");

const graph = new Graph({
  autoCreateNodes: true,
  loggingLevel: 0,
  constantNodesCost: 100,
  ignoreErrors: false,
});

var Djikstra = litepathfindings.Djikstra;
const port = 30517;
const addr = "challenges.ctfd.io";
const client = net.createConnection(port, addr, () => {
  console.log("connected!");
});

// let dataArr = [];
// client.on("data", (data: any) => {
//   dataArr.push(data.toString("utf-8"));
//   if (dataArr.length % 2 === 0) {
//     let nodes = dataArr
//       .join("")
//       .match(/\ \w,\ \w/gm)[0]
//       .trim()
//       .split(", ")
//       .map((data) => data.replace("\n", ""));

//     let unparsedJsonData = dataArr.join(", ").match(/\[\{.*\}\]/gm)[0];
//     if (unparsedJsonData[0] === ",")
//       unparsedJsonData = unparsedJsonData.substr(1, unparsedJsonData.length);
//     if (unparsedJsonData.match(/,\d+/)) {
//       unparsedJsonData.replace(
//         /,\d+/,
//         unparsedJsonData = unparsedJsonData.match(/,\d+/)[0].replace(",", "")
//       );
//     }

//     if (unparsedJsonData.match(/,\s+\d+/)) {
//       let m = unparsedJsonData.match(/,\s+\d+/)[0];
//       unparsedJsonData = unparsedJsonData.replace(m, m.replace(/,\s+/, ""))
//     }

//     if (unparsedJsonData.match(/,\s+,|\,\,/)) {
//       let m = unparsedJsonData.match(/,\s+,|\,\,/)[0];
//       unparsedJsonData = unparsedJsonData.replace(m, m.replace(/,\s+,|\,\,/, ","))
//     }

//     if (unparsedJsonData.match(/,\s+\:\d+/)) {
//       let m = unparsedJsonData.match(/,\s+\:\d+/)[0];
//       unparsedJsonData = unparsedJsonData.replace(m, m.replace(/,\s+\:/, ":"))
//     }

//     //\d+,\s+
//     if (unparsedJsonData.match(/\d+,\s+/)) {
//       let m = unparsedJsonData.match(/\d+,\s+/)[0];
//       unparsedJsonData = unparsedJsonData.replace(m, m.replace(/,\s+/, ""))
//     }

//     jsonData = JSON.parse(unparsedJsonData);
//     if(nodes.length === 2 && jsonData) {
//       let path = findPath(jsonData, nodes);
//       if(path !== null) {
//         console.log(path.join('-'));
//         client.write(path.join('-'));
//         dataArr = [];
//       } else client.end();
//     }
//   }
// });

let dataArr = [];

client.on("data", (data) => {
  dataArr.push(data.toString("utf-8"));
  console.log(dataArr);
  if(dataArr.length % 2 == 0) {
    let newData = dataArr.join().split("\n");
    let nodes = parseNodes(newData[0]);
    let graph = parseGraph(newData[1]);
    let path = findPath(graph, nodes);
    if(path) {
      client.write(path.join('-'))
      dataArr = [];
    }
  }
});

function parseNodes(str) {
  let tmp = str.split(",");    
  let nodes = [tmp[1].trim(), tmp[2].trim()];
  return nodes;
}

function parseGraph(str: string) {
  if(str[0] === ',') {
    str = str.substr(1);
  }
  return JSON.parse(JSON.stringify(jsonFix(str).data));
}

let listNodeNames = new Map<string, Map<string, number>>();
let indexedArray: {[key:string]: {[key:string]: number}} = {};
function findPath(jsonGraph: any, nodes) {
  jsonGraph.forEach((obj: { pts: string[]; distance: number }) => {
      graph.addRoute(obj.pts[0], obj.pts[1], obj.distance);
  });

  console.table(jsonGraph);
  console.table(nodes);
  graph.print();
  let floyd_warshall = graph.findMatricesFloydWarshall(); // output: => [<distance_matrix>, <precedence_matrix>]
  let p = graph.findPathFloydWarshall(nodes[0], nodes[1])
  console.log(p);
  return p.path;
}

/*
jsonGraph.forEach((obj: { pts: string[]; distance: number }) => {
    const connections = listNodeNames.get(obj.pts[0]);
    if (connections) {
      const keys = Object.keys(connections);
      if (!keys.includes(obj.pts[1])) {
        listNodeNames.set(
          obj.pts[0],
          connections.set(obj.pts[1], obj.distance)
        );
      }
    } else listNodeNames.set(obj.pts[0], new Map().set(obj.pts[1], obj.distance));

*/

/*
  jsonGraph.forEach((obj: { pts: string[]; distance: number }) => {
    const connections = indexedArray[obj.pts[0]];
    if(connections) { 
      const keys = Object.keys(connections);
      if(!keys.includes(obj.pts[1])) {
        indexedArray[obj.pts[0]] = { ...connections, [obj.pts[1]]:obj.distance}
      }
    } else indexedArray[obj.pts[0]] = { [obj.pts[1]]: obj.distance };
  });
*/