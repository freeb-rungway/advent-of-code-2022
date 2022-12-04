import FileReader from "../common/FileReader.js";

let data = FileReader.readFile(`${FileReader.getDirectoryOfPath(import.meta.url)}/day4.txt`);
data = data.filter(row => row.length > 0);

const deconstructPair = (row) => {
  const returned = [];

  const groups = row.split(',');
  groups.forEach((group, i) => {
    returned.push([]);
    const range = group.split('-');
    for(let j = parseInt(range[0]); j <= range[1]; j++){
      returned[i].push(j);
    }
  })
  return returned;
}


const partOne = () => {
  let pairContainmentCount = 0;
  /**
   * Loop over each row
   */
  data.forEach((row) => {
    const occurrences = {};
    const deconstructedPair = deconstructPair(row);
    /**
     * loop over each deconstructed pair and create an object that is keyed by each value in the range.
     */
    deconstructedPair.forEach((range) => {
      range.forEach((value) => {
        if(occurrences[value]){
          occurrences[value] += 1;
        } else {
          occurrences[value] = 1;
        }
      })
    })

    /**
     * Whichever range is the smallest is the one that we'll want to use for checking because its the one that WOULD fit inside the
     * other range.
     */
    const smallestRangeCount = deconstructedPair[0].length <= deconstructedPair[1].length ? deconstructedPair[0].length : deconstructedPair[1].length;

    /**
     * Get a count of all the times in the occurrences where the value is greater than 1, meaning it showed up in both ranges.
     */
    const overlapCount = Object.keys(occurrences).filter(key => {
      return occurrences[key] > 1;
    }).length;

    /**
     * If the length of the smallest range is the same as the overlap count that must mean all values of the smallest range were also found in
     * the larger one, meaning it can nest inside.
     */
    if(smallestRangeCount === overlapCount){
      pairContainmentCount += 1;
    }
  })
  return pairContainmentCount;
}

const partTwo = () => {
  let pairOverlapCount = 0;
  /**
   * Loop over each row
   */
  data.forEach((row) => {
    const occurrences = {};
    const deconstructedPair = deconstructPair(row);
    /**
     * loop over each deconstructed pair and create an object that is keyed by each value in the range.
     */
    deconstructedPair.forEach((range) => {
      range.forEach((value) => {
        if(occurrences[value]){
          occurrences[value] += 1;
        } else {
          occurrences[value] = 1;
        }
      })
    })

    /**
     * Get a count of all the times in the occurrences where the value is greater than 1, meaning it showed up in both ranges.
     */
    const overlapCount = Object.keys(occurrences).filter(key => {
      return occurrences[key] > 1;
    }).length;

    /**
     * If at least 1 overlap occurred, we count it as an overlapping pair for part two.
     */
    if(overlapCount >= 1){
      pairOverlapCount += 1;
    }
  })
  return pairOverlapCount;
}

console.log(`The total number of rows is: ${data.length}`);
console.log(`The total number of containing pairs is: ${partOne()}`);
console.log(`The total number of containing pairs with any overlap is: ${partTwo()}`);
