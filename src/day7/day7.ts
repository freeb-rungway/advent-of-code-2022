import FileReader from "../common/FileReader.js";
import MobileDevice from '../common/MobileDevice.js';

let data = FileReader.readFile(`${FileReader.getDirectoryOfPath(import.meta.url)}/day7.txt`);

MobileDevice.loadSystemCommands(data.filter(row => row.length > 0));

