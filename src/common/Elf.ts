

export const items = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
]

/**
 * Given an item code, go and get its "value/priority" this is effectively its index + 1
 * @param item
 */
export const getItemValue = (item: string) => {
  const index = items.findIndex((i) => i === item);
  if(index > -1){
    return index+1
  } else {
    return 0;
  }
}

class Elf {
  calories: number[] = []
  inventory = {
    compartmentOne: [],
    compartmentTwo: [],
  }

  /**
   * Add an item to the elves calories
   * @param calories
   */
  addCalories(calories: number){
    this.calories.push(calories);
  }

  /**
   * Look over the inventory and add up the items to
   */
  get totalCalories(){
    return this.calories.reduce((a, b) => a + b, 0)
  }

  loadInventory(inventoryString: string){
    if(inventoryString.length > 0){
      const inventorySize = inventoryString.length;
      this.inventory.compartmentOne = inventoryString.slice(0, inventorySize/2).split('');
      this.inventory.compartmentTwo = inventoryString.slice(inventorySize/2).split('');

      /**
       * Sort each array alphabetically
       */
      this.inventory.compartmentOne.sort((a,b) => a.localeCompare(b));
      this.inventory.compartmentTwo.sort((a,b) => a.localeCompare(b));
    }
  }

  get uniqueInventoryItems(){
    return [...new Set([...this.inventory.compartmentOne,...this.inventory.compartmentTwo])];
  }
}

export default Elf;
