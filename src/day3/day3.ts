import FileReader from "../common/FileReader.js";
import Elf, {getItemValue} from "../common/Elf.js";

let data = FileReader.readFile(`${FileReader.getDirectoryOfPath(import.meta.url)}/day3.txt`);


const partOne = () => {
  const elves = [];
  data.forEach((inventoryString) => {
    if(inventoryString.length > 0){
      const elf = new Elf();
      elf.loadInventory(inventoryString);
      elves.push(elf);
    }
  })

  let totalItemValue = 0;

  elves.forEach((elf) => {
    let duplicateItems = [];
    elf.inventory.compartmentOne.forEach((item) => {
      if(elf.inventory.compartmentTwo.findIndex((i) => i === item) > -1){
        duplicateItems.push(item);
      }
    });
    duplicateItems = [...new Set(duplicateItems)];

    duplicateItems.forEach((item) => {
      totalItemValue += getItemValue(item);
    })
  });

  return totalItemValue;
}

const partTwo = () => {
  data = data.filter((row) => row.length > 0);
  const elfGroups = [];
  /**
   * Group rows into 3's
   */
  for(let i=0; i<data.length; i += 3){
    elfGroups.push(data.slice(i, i + 3));
  }


  let totalBadgePriority = 0;

  /**
   * Loop over the groups and intialise them all as the elf class with their inventory.
   *
   * Then go over each elf in a group and add its unique items into the groupInventory, incrementing the
   * count by 1 if the item already exists. This will provide us with a total inventory for all 3 elves.
   */
  elfGroups.forEach((group, i) => {
    let groupInventory = {};
    group.forEach((row, j) => {
      elfGroups[i][j] = new Elf();
      elfGroups[i][j].loadInventory(row);

      elfGroups[i][j].uniqueInventoryItems.forEach((k) => {
        if(groupInventory[k]){
          groupInventory[k] += 1;
        } else {
          groupInventory[k] = 1;
        }
      })
    })

    /**
     * Look at the group inventory and find the item that has a value of 3 (meaning it was found in
     * all 3 inventories in each group).
     */
    let sharedItem = null;
    Object.keys(groupInventory).forEach((key) => {
      const value = groupInventory[key];
      if(value === 3){
        sharedItem = key;
      }
    })
    if(sharedItem){
      totalBadgePriority += getItemValue(sharedItem);
    }
  })

  return totalBadgePriority;
}


console.log(`Total value of shared inventory items: ${partOne()}`);
console.log(`Total value of badge priorities: ${partTwo()}`);

