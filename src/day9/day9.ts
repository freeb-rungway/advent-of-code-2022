import FileReader from "../common/FileReader.js";
import {clearInterval} from "timers";

let data = FileReader.readFile(`${FileReader.getDirectoryOfPath(import.meta.url)}/day9.txt`);
data = data.filter(row => row.length > 0);

class GridSpace {
  visited: false;
  isHead: false;
  isTail: false;
  x;
  y;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

/**
 * My Grid
 * Y - 600
 * X - 220
 *
 * Start - 480/150
 *
 * Salams Grid
 * Y - 600
 * X - 400
 *
 * Start - 480/280
 */
const grid=[];
const gridSizeY = 600; // 600
const gridSizeX = 220; // 220
for(let i=0;i<gridSizeY;i++){
  grid[i] = [];
  for(let j=0;j<(gridSizeX);j++){
    grid[i].push(new GridSpace(j,i));
  }
}

grid[480][150].isHead = true; //480/150
grid[480][150].visited = true; //480/150


const commandList = [];

data.forEach((row) => {
  const command = row.split(' ');
  const direction = command[0];
  const amount = parseInt(command[1]);
  for(let i=0; i<amount; i++){
    commandList.push(`${direction} 1`);
  }
})



function printGrid(){
  grid.forEach((row, i) => {
    process.stdout.cursorTo(0, i);
    process.stdout.clearLine(1);
    const rowOutput = [];
    row.forEach(space => {
      if (space.isHead){
        rowOutput.push('H');
      } else if (space.isTail){
        rowOutput.push('T');
      } else if(space.visited){
        rowOutput.push('#')
      } else {
        rowOutput.push('.')
      }
    })
    process.stdout.write(`${rowOutput.join('')}\n`);
  });
  process.stdout.write(`\n\n${ticks} ticks`);
}

function findHead(){
  let head = null;
  grid.forEach(row => {
    row.forEach(space => {
      if(space.isHead){
        head = space;
      }
    })
  })
  return head;
}

function findTail(){
  let tail = null;
  grid.forEach(row => {
    row.forEach(space => {
      if(space.isTail){
        tail = space;
      }
    })
  })
  return tail;
}

let diagonalCounts = 0;


function isDiagonal(head, tail){
  const diagonalCoordinates = [
    [tail.y+1,tail.x+1],
    [tail.y-1,tail.x-1],
    [tail.y+1,tail.x-1],
    [tail.y-1,tail.x+1],
  ];

  let isDiagonal = false;
  diagonalCoordinates.forEach((coords) => {
    if(head.y === coords[0] && head.x === coords[1]){
      isDiagonal = true;
      diagonalCounts += 1;
    }
  })
  return isDiagonal;
}


function move(space: GridSpace, direction, amount: number){
  let positionY = space.y;
  let positionX = space.x;
  switch (direction){
    case 'U':
      positionY = positionY-amount;
      break;
    case 'D':
      positionY = positionY+amount;
      break;
    case 'L':
      positionX = positionX-amount;
      break;
    case 'R':
      positionX = positionX+amount;
      break;
    default:
      break;
  }
  /**
  if(!grid[positionY]){
    grid.push([]);
    for(let j=0;j<=positionX;j++){
      grid[positionY].push(new GridSpace(j,positionY));
    }
  }
  if(!grid[positionY][positionX]){
    // positionX = 302;
    // grid[positionY].length = 300;
    for(let i=grid[positionY].length; i <= positionX; i++){
      grid[positionY].push(new GridSpace(i,positionY))
    }
  }
  */

  if(space.isHead){
    // console.log(`${positionY} | ${positionX}`);
    grid[positionY][positionX].isHead = true;
    space.isHead = false;
  }
  if(space.isTail && !grid[positionY][positionX].isHead){
    grid[positionY][positionX].isTail = true;
    grid[space.y][space.x].isTail = false;
    if(
      !shouldTailMove()
    ){
      if(tailCommands.length > 0 && isDiagonal(findHead(), findTail())){
        const tail = findTail();

        const tailCommand = tailCommands.shift();
        const tailDirection = tailCommand[0];
        const tailAmount = parseInt(tailCommand[1]);

        move(tail, tailDirection, tailAmount);
      } else {
        grid[positionY][positionX].visited = true;
      }
    }
  }

  if(findTail() === null){
    grid[space.y][space.x].isTail = true;
  }
}

function calculateDistanceBetweenTwoSpaces(spaceOne, spaceTwo){
  if(spaceOne && spaceTwo){
    let yDistance = 0;
    let xDistance = 0;
    if(spaceOne.y > spaceTwo.y){
      yDistance = spaceOne.y - spaceTwo.y;
    } else {
      yDistance = spaceTwo.y - spaceOne.y;
    }
    if(spaceOne.x > spaceTwo.x){
      xDistance = spaceOne.x - spaceTwo.x;
    } else {
      xDistance = spaceTwo.x - spaceOne.x;
    }
    if(yDistance > xDistance){
      return yDistance
    } else{
      return xDistance;
    }
  }
  return 0;
}

function shouldTailMove(){
  const distance = calculateDistanceBetweenTwoSpaces(findHead(),findTail());
  if(distance > 1){
    return true;
  }
  return false;
}

let tailCommands = [];

function processCommand(tick){
  const command = commandList[tick].split(' ');
  const direction = command[0];
  const amount = parseInt(command[1]);

  const head = findHead();
  move(head, direction, amount); // Head moves
  tailCommands.push(command);
  // RIGHT 5
  // LEFT 5
  /*
  ........
  ..XXXTH
  ........
   */
  while(shouldTailMove() && tick > 0){
    const tail = findTail();

    const tailCommand = tailCommands.shift();
    const tailDirection = tailCommand[0];
    const tailAmount = parseInt(tailCommand[1]);

    move(tail, tailDirection, tailAmount);
  }
}




let ticks = 0;
/**
const interval = setInterval(function(){
  if(ticks < commandList.length){
    processCommand(ticks);
    ticks += 1;
    printGrid();
  } else {
    clearInterval(interval);

    let tailVisitedCount = 0;
    grid.forEach(row => {
      row.forEach(space => {
        if(space.visited){
          tailVisitedCount += 1;
        }
      })
    })
// printGrid();
    process.stdout.write(`\n\nTail Commands: ${tailCommands.length}`);
    process.stdout.write(`\n\nTail Visited Count: ${tailVisitedCount}`);
    process.stdout.write(`\n\nTotal Lines: ${data.length}`);
  }
}, 500);
*/

while(ticks < commandList.length){
  processCommand(ticks);
  ticks += 1;
}

let tailVisitedCount = 0;
grid.forEach(row => {
  row.forEach(space => {
    if(space.visited){
      tailVisitedCount += 1;
    }
  })
})

printGrid();
process.stdout.write(`\n\nTail Commands: ${tailCommands.length}`);
process.stdout.write(`\n\nTail Visited Count: ${tailVisitedCount}`);
process.stdout.write(`\n\nTotal Lines: ${data.length}`);


// 6316
