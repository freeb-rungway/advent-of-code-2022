


class Elf {
  calories: number[] = []

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
}

export default Elf;
