import FileReader from "../common/FileReader.js";
import RockPaperScissors from '../common/RockPaperScissors.js';

const data = FileReader.readFile(`${FileReader.getDirectoryOfPath(import.meta.url)}/day2.txt`);

RockPaperScissors.loadRounds(data);

let total = 0;
RockPaperScissors.rounds.forEach((r) => {
  total += r.outcome;
})

console.log(`Total score out of all rounds: ${total}`);
RockPaperScissors.reset();


