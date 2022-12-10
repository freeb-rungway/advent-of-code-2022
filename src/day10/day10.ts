import FileReader from "../common/FileReader.js";

let data = FileReader.readFile(`${FileReader.getDirectoryOfPath(import.meta.url)}/day10.txt`);
data = data.filter(row => row.length > 0);

const cyclesToRun = [];
data.forEach((row) => {
  if(row === 'noop'){
    cyclesToRun.push(0);
  } else {
    const change = row.split(' ')[1];
    cyclesToRun.push(0);
    cyclesToRun.push(parseInt(change));
  }
})

let x = 1;
const signalStrengths = [];

cyclesToRun.forEach((cycle, i) => {
  const cycleNumber = i+1;
  if(cycleNumber === 20 || cycleNumber === 60 || cycleNumber === 100 || cycleNumber === 140|| cycleNumber === 180 || cycleNumber === 220){
    signalStrengths.push(x*cycleNumber);
  }
  x += cycle;
})

console.log(x);
console.log(signalStrengths);
console.log(`Sum of total signalStrengths is: ${signalStrengths.reduce((partialSum, a) => partialSum + a, 0)}`)
