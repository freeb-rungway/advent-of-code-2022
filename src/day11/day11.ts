import FileReader from "../common/FileReader.js";

class MonkeyInTheMiddle {
  currentRound = 1;
  monkeys: Monkey[] = [];

  addMonkey(monkey: Monkey){
    this.monkeys.push(monkey);
  }

  playARound(){
    console.log(`PLAYING ROUND ${this.currentRound}`);
    //console.log('\n');
    this.monkeys.forEach((monkey, i) => {
      //console.log(`Round ${this.currentRound} for Monkey ${i}`)
      while(monkey.items.length > 0){
        let item = monkey.items.shift();
        //console.log(`Monkey ${i} inspects ${item}...`)
        item = monkey.inspect(item);
        //console.log(`After inspection Monkey ${i}'s item is now ${item}`)
        if(monkey.test(item)){
          //console.log(`They throw the item to Monkey ${monkey.testTrueMonkey}`)
          this.monkeys[monkey.testTrueMonkey].items.push(item);
        } else {
          //console.log(`They throw the item to Monkey ${monkey.testFalseMonkey}`)
          this.monkeys[monkey.testFalseMonkey].items.push(item);
        }
      }
      //console.log('\n');
    })
    //console.log('END OF THE ROUND:')
    this.currentRound += 1;
  }
}

class Monkey {
  items: number[] = [];
  operation: string;
  testDivider: number;
  testTrueMonkey: number;
  testFalseMonkey: number;
  inspections: number = 0;

  constructor(items, operation, testDivider, testTrueMonkey, testFalseMonkey) {
    this.items = items;
    this.operation = operation;
    this.testDivider = parseInt(testDivider);
    this.testTrueMonkey = parseInt(testTrueMonkey);
    this.testFalseMonkey = parseInt(testFalseMonkey);
  }

  inspect(item: number){
    let operation: string | string[] = this.operation;
    operation = operation.replaceAll('old',item.toString()).split(' ');
    let a = parseInt(operation[0])
    let b = parseInt(operation[2])
    switch (operation[1]){
      case '*':
        item = a * b;
        break;
      case '+':
        item = a + b;
        break;
    }
    this.inspections += 1;
    // return Math.floor(item/3); // Part 1, we divide the worry level by 3
    return item % 9699690; // Part 2, we no longer divide the worry level by 3
  }

  test(item: number){
    return item % this.testDivider === 0;
  }
}


let data = FileReader.readFile(`${FileReader.getDirectoryOfPath(import.meta.url)}/day11.txt`);



const game = new MonkeyInTheMiddle();

/**
 * Takes all the rows and parses each one to get the data we're actually after.
 * @param rows
 */
const parseMonkeyInput = (rows: string[]) => {
  const startingItems = rows[1]
    .replace('Starting items:','')
    .trim()
    .split(', ')
    .map((item) => parseInt(item));
  const operation = rows[2]
    .replace('Operation: new = ','')
    .trim();
  const testDivider = rows[3]
    .replace('Test: divisible by ','')
    .trim();
  const testTrueMonkey = rows[4]
    .replace('If true: throw to monkey ', '')
    .trim();
  const testFalseMonkey = rows[5]
    .replace('If false: throw to monkey ', '')
    .trim();
  /*
  console.log(startingItems);
  console.log(operation);
  console.log(testDivider);
  console.log(testTrueMonkey);
  console.log(testFalseMonkey);
  console.log('-----------');
   */
  return new Monkey(startingItems, operation, testDivider, testTrueMonkey, testFalseMonkey);
}

data.forEach((row, index) => {
  if(index === 0 || row.length === 0 && index < data.length-1){
    if(index === 0){
      game.addMonkey(parseMonkeyInput(data.slice(index, index+6))) //If starting monkey it wont have a blank line
    } else {
      game.addMonkey(parseMonkeyInput(data.slice(index+1, index+7))) //If not starting monkey we need to account for that extra line
    }
  }
})

const numberOfRounds = 10000;

for(let i=0; i < numberOfRounds; i++){
  game.playARound();
}

const inspections = game.monkeys.map((monkey) => monkey.inspections).sort((a,b) => {
  if(a > b){ return -1 };
  if(a === b){ return 0 };
  if(a > b){ return 1 };
})

console.log('\n');
console.log('Ordered Inspections At end of game:');
console.log(inspections);

console.log('\n');
console.log('Level of Monkey Business:');
console.log(inspections[0] * inspections[1]);



