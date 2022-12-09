import FileReader from "../common/FileReader.js";

let data = FileReader.readFile(`${FileReader.getDirectoryOfPath(import.meta.url)}/day8.txt`);
data = data.filter(row => row.length > 0);

const trees = [];

class Tree {
  height;
  y;
  x;

  visibleLeft;
  visibleTop;
  visibleRight;
  visibleBottom;

  constructor(height, x, y) {
    this.height = height;
    this.x = x;
    this.y = y;
  }

  calculateLeftVisibility(){
    let row = trees[this.y];
    for(let i=0; i < this.x; i++){
      const tree = row[i];
      if(this.height > tree.height){
        this.visibleLeft = true;
      } else {
        this.visibleLeft = false;
        break;
      }
    }
    return this.visibleLeft;
  }

  calculateRightVisibility(){
    let row = trees[this.y];
    for(let i=row.length-1; i > this.x; i--){
      const tree = row[i];
      if(this.height > tree.height){
        this.visibleRight = true;
      } else {
        this.visibleRight = false;
        break;
      }
    }
    return this.visibleRight;
  }

  calculateTopVisibility(){
    let row = trees.map((row, y) => row[this.x]);
    for(let i=0; i < this.y; i++){
      const tree = row[i];
      if(this.height > tree.height){
        this.visibleTop = true;
      } else {
        this.visibleTop = false;
        break;
      }
    }
    return this.visibleTop;
  }

  calculateBottomVisibility(){
    let row = trees.map((row, y) => row[this.x]);
    for(let i=row.length-1; i > this.y; i--){
      const tree = row[i];
      if(this.height > tree.height){
        this.visibleBottom = true;
      } else {
        this.visibleBottom = false;
        break;
      }
    }
    return this.visibleBottom;
  }

  get isEdge(){
    return (
      this.x === 0
      || this.y === 0
      || this.x === trees[0].length-1
      || this.y === trees.length-1
    );
  }

  get isVisible(){
    this.calculateLeftVisibility();
    this.calculateRightVisibility();
    this.calculateTopVisibility();
    this.calculateBottomVisibility();

    return (
      this.visibleLeft
      || this.visibleRight
      || this.visibleTop
      || this.visibleBottom
      || this.isEdge
    )
  }

  generateScenicTop(){
    let score = 0;
    for(let i=this.y-1; i >= 0; i--){
      const tree = trees[i][this.x];
      if(tree.height < this.height){
        score += 1;
      } else {
        score += 1;
        break;
      }
    }
    return score;
  }

  generateScenicLeft(){
    let score = 0;
    for(let i=this.x-1; i >= 0; i--){
      const tree = trees[this.y][i];
      if(tree.height < this.height){
        score += 1;
      } else {
        score += 1;
        break;
      }
    }
    return score;
  }

  generateScenicBottom(){
    let score = 0;
    for(let i=this.y+1; i < trees.length; i++){
      const tree = trees[i][this.x];
      if(tree.height < this.height){
        score += 1;
      } else {
        score += 1;
        break;
      }
    }
    return score;
  }

  generateScenicRight(){
    let score = 0;
    for(let i=this.x+1; i < trees[this.y].length; i++){
      const tree = trees[this.y][i];
      if(tree.height < this.height){
        score += 1;
      } else {
        score += 1;
        break;
      }
    }
    return score;
  }


  scenicScore(){
    const top = this.generateScenicTop();
    const left = this.generateScenicLeft();
    const bottom = this.generateScenicBottom();
    const right = this.generateScenicRight();
    return top * left * bottom * right;
  }
}

data.forEach((row,y) => {
  const treeRow = [];
  row.split('').forEach((tree,x) => {
    treeRow.push(new Tree(parseInt(tree), x, y));
  })
  trees.push(treeRow);
})

let treeCount = 0;

trees.forEach((treeRow, yIndex) => {
  const row = []
  treeRow.forEach((tree, xIndex) => {
    if(tree.isVisible){
      row.push(`x`)
      treeCount += 1;
    } else {
      row.push('-')
    }
  })
  console.log(row.join(''));
})

let topScenicScore = 0;

trees.forEach((treeRow, yIndex) => {
  treeRow.forEach((tree, xIndex) => {
    if(tree.scenicScore() > topScenicScore){
      topScenicScore = tree.scenicScore();
    }
  })
})

console.log(`Total Visible Tree Count is: ${treeCount}`);
console.log(`Highest Scenic Score is: ${topScenicScore}`);
