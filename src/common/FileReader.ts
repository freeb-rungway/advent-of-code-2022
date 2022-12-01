import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

class FileReader {

  getDirectoryOfPath(url){
    return dirname(fileURLToPath(url));
  }

  readFile(file: string){
    try{
      return fs.readFileSync(file,'utf-8').split(/\r?\n/)
    } catch (err) {
      console.error(err);
    }
  }
}

const fileReader = new FileReader();
export default fileReader;
