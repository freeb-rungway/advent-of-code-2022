import FileReader from "../common/FileReader.js";

let data = FileReader.readFile(`${FileReader.getDirectoryOfPath(import.meta.url)}/day5.txt`);

/**
 * Get commands list
 */
const commands = data.slice(10).filter(row => row.length > 0);

const originalColumns = {
  1: ['Z','T','F','R','W','J','G'],
  2: ['G','W','M'],
  3: ['J','N','H','G'],
  4: ['J','R','C','N','W'],
  5: ['W','F','S','B','G','Q','V','M'],
  6: ['S','R','T','D','V','W','C'],
  7: ['H','B','N','C','D','Z','G','V'],
  8: ['S','J','N','M','G','C'],
  9: ['G','P','N','W','C','J','D','L'],
}

const partOne = () => {
  const columns = structuredClone(originalColumns);
  commands.forEach((commandString) => {
    const split = commandString.split(' ');
    const moveCount = parseInt(split[1]);
    const popColumn = parseInt(split[3]);
    const recipientColumn = parseInt(split[5]);
    /**
     * For the amount of moves we need to make, keep popping the item off the end of the column and adding
     * it to the recipient.
     */
    for(let i = 0; i < moveCount; i++){
      const popped = columns[popColumn].pop();
      columns[recipientColumn].push(popped);
    }
  });

  /**
   * Join the topstack together to form the string
   */
  const topStack = [];
  Object.keys(columns).forEach((key) => {
    topStack.push([...columns[key]].pop());
  })

  return topStack.join('');
}

const partTwo = () => {
  const columns = structuredClone(originalColumns);
  commands.forEach((commandString) => {
    const split = commandString.split(' ');
    const moveCount = parseInt(split[1]);
    const sliceColumn = parseInt(split[3]);
    const recipientColumn = parseInt(split[5]);
    /**
     * Splice all items from the end of the slice column by the amount we need to move and push them
     * onto the end of the recipient.
     */
    const splice = columns[sliceColumn].splice(columns[sliceColumn].length - moveCount, moveCount);
    columns[recipientColumn].push(...splice);
  });

  /**
   * Combine top crates together to form the string.
   */
  const topStack = [];
  Object.keys(columns).forEach((key) => {
    topStack.push([...columns[key]].pop());
  })

  return topStack.join('');
}



console.log(`Top stack input with CrateMover 9000 is: ${partOne()}`);
console.log(`Top stack input with CrateMover 9001 is: ${partTwo()}`);
