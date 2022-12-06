import FileReader from "../common/FileReader.js";

let data = FileReader.readFile(`${FileReader.getDirectoryOfPath(import.meta.url)}/day6.txt`);

const dataStream = data[0].split('');

const partOne = () => {
  dataStream.every((character, index) => {
    const check = dataStream.slice(index, index+4);
    const unique = [...new Set(check)];
    if(unique.length === 4){
      console.log(`Data stream packet found at index: ${index+4}`);
      console.log(`Data stream packet: ${unique.join('')}`);
      return false;
    }
    return true;
  })
}

const partTwo = () => {
  dataStream.every((character, index) => {
    const check = dataStream.slice(index, index+14);
    const unique = [...new Set(check)];
    if(unique.length === 14){
      console.log(`Data stream message found at index: ${index+14}`);
      console.log(`Data stream message: ${unique.join('')}`);
      return false;
    }
    return true;
  })
}

partOne();
partTwo()
