

enum Moves {
  ROCK = "ROCK",
  PAPER = "PAPER",
  SCISSOR = "SCISSOR",
}

const winMapping = {
  [Moves.ROCK]: {
    wins: Moves.SCISSOR,
    loses: Moves.PAPER,
  },
  [Moves.PAPER]: {
    wins: Moves.ROCK,
    loses: Moves.SCISSOR,
  },
  [Moves.SCISSOR]: {
    wins: Moves.PAPER,
    loses: Moves.ROCK,
  }
}

const moveScore = {
  [Moves.ROCK]: 1,
  [Moves.PAPER]: 2,
  [Moves.SCISSOR]: 3,
}




class Move {
  name;
  score;

  constructor(name: Moves, score: number) {
    this.name = name;
    this.score = score;
  }
}

class Round {
  opponent;
  me;

  constructor(opponent: Move, me: Move) {
    this.opponent = opponent;
    this.me = me;
  }

  get outcome() {
    const item = winMapping[this.opponent.name];
    let score = 3;
    if(item.loses === this.me.name){
      score = 6 // If my item wins
    }
    if(item.wins === this.me.name){
      score = 0; // If my item loses
    }
    return score + this.me.score;
  }
}

class RockPaperScissors {

  rounds = [];

  public loadRounds(rounds: string[]){
    rounds.forEach((round) => {
      const r = RockPaperScissors.parseRound(round);
      if(r){
        this.rounds.push(r);
      }
    })
  }

  public reset(){
    this.rounds = [];
  }

  public static calculateRockPaperOrScissor(code: string, opponent = null){
    switch(code){
      case "A":
        return new Move(Moves.ROCK, moveScore[Moves.ROCK]);
      case "B":

        return new Move(Moves.PAPER, moveScore[Moves.PAPER]);
      case "C":
        return new Move(Moves.SCISSOR, moveScore[Moves.SCISSOR]);
      case "X":
        const lossPick = winMapping[opponent.name].wins;
        return new Move(lossPick, moveScore[lossPick])
      case "Y":
        const drawPick = opponent.name;
        return new Move(drawPick, moveScore[drawPick])
      case "Z":
        const winPick = winMapping[opponent.name].loses;
        return new Move(winPick, moveScore[winPick])

    }
  }

  public static parseRound(round) {
    let opponent = RockPaperScissors.calculateRockPaperOrScissor(round.split(" ")[0]);
    let me = RockPaperScissors.calculateRockPaperOrScissor(round.split(" ")[1], opponent);
    if(opponent && me){
      return new Round(opponent, me);
    }
  }

}

const rockPaperScissors = new RockPaperScissors();
export default rockPaperScissors;
