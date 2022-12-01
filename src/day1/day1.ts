import FileReader from '../common/FileReader.js';
import Elf from "../common/Elf.js";

const data = FileReader.readFile(`${FileReader.getDirectoryOfPath(import.meta.url)}/day1.txt`);

const elves = [];
let elf = null;
data.forEach((line: string) => {
  if(line.length > 0){
    if(!elf){
      elf = new Elf();
    }
    elf.addCalories(parseInt(line))
  } else {
    elves.push(elf);
    elf = null;
  }
})

/**
 * Sorts the elves by total calories in ascending order.
 */
elves.sort((a, b) => {
  if(a.totalCalories > b.totalCalories){
    return 1;
  }
  if(a.totalCalories < b.totalCalories){
    return -1;
  }
  return 0;
})
const elfCount = elves.length;
const highestThreeElves = elves.slice(elfCount - 3);
let highestThreeTotal = 0;
highestThreeElves.forEach((elf) => {
  highestThreeTotal += elf.totalCalories;
})

console.log(`Highest Calorie Elf is: ${elves[elfCount - 1].totalCalories}`)
console.log(`Total of the Highest Three Elves is: ${highestThreeTotal}`)
