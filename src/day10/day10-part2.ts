import FileReader from "../common/FileReader.js";
import {clearInterval} from "timers";

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

const renderScreen = () => {
  console.clear();
  /**
   * Row to Add
   */
  currentRow.forEach((value) => {
    process.stdout.write(value);
  })
  process.stdout.write(`\n`);

  /**
   * Sprite Track
   */
  for(let i=1; i<=40; i++){
    if(i === x-1 || i === x || i === x+1){
      process.stdout.write('#')
    } else {
      process.stdout.write('.')
    }

  }
  process.stdout.write(`\n`);

  /**
   * Pointer
   */
  for(let i=0; i<40; i++){
    process.stdout.write(i === pointer ? '^' : '.')
  }
  process.stdout.write(`\n`);
  process.stdout.write(`\n`);
  process.stdout.write(`\n`);
  grid.forEach(row => {
    row.forEach(pixel => {
      process.stdout.write(pixel);
    })
    process.stdout.write(`\n`);
  })
}





let x = 1;
const grid = [];
let rowIndex = 0;
let currentRow = Array(40).fill('.');
currentRow[0] = '#';

let pointer = 0;

/*
cyclesToRun.forEach((cycle, i) => {
  const cycleNumber = i+1;
  const gridRow = Math.floor(i/40);
  if(cycleNumber === 1 ||cycleNumber === 41 || cycleNumber === 81 || cycleNumber === 121 || cycleNumber === 161 || cycleNumber === 201){
    sprite.x = 0;
  } else {
    sprite.x += 1;
  }

  console.log(gridRow);

  if(cycle){
    sprite.x += cycle;
  }
  x += cycle;
})
*/
const isPointerOnSprite = () => {
  return (pointer === x-1 || pointer === x || pointer === x+1)
}


let tick = 0;
const interval = setInterval(() => {
  tick += 1;
  /**
   * Run unless we have no more cycles
   */
  if(cyclesToRun.length > tick){
    pointer += 1;
    /**
     * If the pointer is at the end of the row, push the current row onto the grid, make another and reset the pointer;
     */
    if(pointer === 40){
      pointer = 0;
      grid.push(currentRow);
      currentRow = Array(40).fill('.');
    }
    if(isPointerOnSprite()){
      currentRow[pointer] = '#';
    }

    const cycle = cyclesToRun[tick];

    if(cycle){
      x += cycle;
    }

    renderScreen();
  } else {
    grid.push(currentRow);
    renderScreen();
    clearInterval(interval);
  }
}, 100);
