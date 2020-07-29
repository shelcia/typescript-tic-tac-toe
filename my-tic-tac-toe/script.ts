//TIC TAC TOE USING TYPESCRIPT

//GETTING THE ELEMENT WITH RESPECT TO CLASS STATUS
var statusDisplay: Element = document.querySelector(".status")!;

// CLASS BEGINS
class Board {
  stateInit: String[] = ["", "", "", "", "", "", "", "", ""]; //INITIAL STATE OF CELLS IN THE BOARD
  currentPlayer: String = "X"; //X WILL START THE GAME
  gameStatus: Boolean = true; //STATUS OF THE GAME
  //ALL ROUTES WHERE PLAYER CAN BE DECLARED AS WINNER
  winningRoutes: number[][] = [
    [0, 1, 2],
    [2, 5, 8],
    [3, 4, 5],
    [0, 4, 8],
    [6, 7, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
  ];

  //ALTERNATE CURRENT PLAYER CHANGE AFTER CLICK EVENT
  setPlayerChange = () => {
    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = `${this.currentPlayer} turn`;
  };

  //VALIDATING THE RESULT
  setResultValidation = () => {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
      const winRoute = this.winningRoutes[i];
      let winRoute1 = this.stateInit[winRoute[0]];
      let winRoute2 = this.stateInit[winRoute[1]];
      let winRoute3 = this.stateInit[winRoute[2]];
      if (winRoute1 === "" || winRoute2 === "" || winRoute3 === "") {
        continue;
      }
      if (winRoute1 === winRoute2 && winRoute2 === winRoute3) {
        roundWon = true;
        break;
      }
    }
    if (roundWon) {
      statusDisplay.innerHTML = `${this.currentPlayer} won the game`;
      this.gameStatus = false;
      return;
    }
    let roundDraw = !this.stateInit.includes("");
    if (roundDraw) {
      statusDisplay.innerHTML = `game was drawn`;
      this.gameStatus = false;
      return;
    }
    this.setPlayerChange();
  };
  //UPDATING THE CELL PLAYED (ROUTE)
  setCellPlayed = (e: any, i: any) => {
    this.stateInit[i] = this.currentPlayer;
    e.innerHTML = this.currentPlayer;
  };
  //WHEN CLICK EVENT OF CELL IS TRIGGERED
  setCellClick = (e: any) => {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(
      clickedCell.getAttribute("data-cell-index")
    );
    if (this.stateInit[clickedCellIndex] !== "" || !this.gameStatus) {
      return;
    }
    this.setCellPlayed(clickedCell, clickedCellIndex);
    this.setResultValidation();
  };
  //WHEN RESTART EVENT IS TRIGGERED
  setRestartGame = () => {
    this.gameStatus = true;
    this.currentPlayer = "X";
    this.stateInit = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = `${this.currentPlayer} turn`;
    document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
  };
}
//CLASS ENDS

//INSTANCE OF CLASS BOARD WITH MEMORY ALLOCATION
var board = new Board();

// GETTING NECESSARY ELEMENT TO PERFORM MANIULATIONS ON
document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", board.setCellClick));

document.querySelector(".btn").addEventListener("click", board.setRestartGame);
