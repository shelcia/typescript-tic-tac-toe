//TIC TAC TOE USING TYPESCRIPT
//GETTING THE ELEMENT WITH RESPECT TO CLASS STATUS
var statusDisplay = document.querySelector(".status");
// CLASS BEGINS
var Board = /** @class */ (function () {
    function Board() {
        var _this = this;
        this.stateInit = ["", "", "", "", "", "", "", "", ""]; //INITIAL STATE OF CELLS IN THE BOARD
        this.currentPlayer = "X"; //X WILL START THE GAME
        this.gameStatus = true; //STATUS OF THE GAME
        //ALL ROUTES WHERE PLAYER CAN BE DECLARED AS WINNER
        this.winningRoutes = [
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
        this.setPlayerChange = function () {
            _this.currentPlayer = _this.currentPlayer === "X" ? "O" : "X";
            statusDisplay.innerHTML = _this.currentPlayer + " turn";
        };
        //VALIDATING THE RESULT
        this.setResultValidation = function () {
            var roundWon = false;
            for (var i = 0; i <= 7; i++) {
                var winRoute = _this.winningRoutes[i];
                var winRoute1 = _this.stateInit[winRoute[0]];
                var winRoute2 = _this.stateInit[winRoute[1]];
                var winRoute3 = _this.stateInit[winRoute[2]];
                if (winRoute1 === "" || winRoute2 === "" || winRoute3 === "") {
                    continue;
                }
                if (winRoute1 === winRoute2 && winRoute2 === winRoute3) {
                    roundWon = true;
                    break;
                }
            }
            if (roundWon) {
                statusDisplay.innerHTML = _this.currentPlayer + " won the game";
                _this.gameStatus = false;
                return;
            }
            var roundDraw = !_this.stateInit.includes("");
            if (roundDraw) {
                statusDisplay.innerHTML = "game was drawn";
                _this.gameStatus = false;
                return;
            }
            _this.setPlayerChange();
        };
        //UPDATING THE CELL PLAYED (ROUTE)
        this.setCellPlayed = function (e, i) {
            _this.stateInit[i] = _this.currentPlayer;
            e.innerHTML = _this.currentPlayer;
        };
        //WHEN CLICK EVENT OF CELL IS TRIGGERED
        this.setCellClick = function (e) {
            var clickedCell = e.target;
            var clickedCellIndex = parseInt(clickedCell.getAttribute("data-cell-index"));
            if (_this.stateInit[clickedCellIndex] !== "" || !_this.gameStatus) {
                return;
            }
            _this.setCellPlayed(clickedCell, clickedCellIndex);
            _this.setResultValidation();
        };
        //WHEN RESTART EVENT IS TRIGGERED
        this.setRestartGame = function () {
            _this.gameStatus = true;
            _this.currentPlayer = "X";
            _this.stateInit = ["", "", "", "", "", "", "", "", ""];
            statusDisplay.innerHTML = _this.currentPlayer + " turn";
            document.querySelectorAll(".cell").forEach(function (cell) { return (cell.innerHTML = ""); });
        };
    }
    return Board;
}());
//CLASS ENDS
//INSTANCE OF CLASS BOARD WITH MEMORY ALLOCATION
var board = new Board();
// GETTING NECESSARY ELEMENT TO PERFORM MANIULATIONS ON
document
    .querySelectorAll(".cell")
    .forEach(function (cell) { return cell.addEventListener("click", board.setCellClick); });
document.querySelector(".btn").addEventListener("click", board.setRestartGame);
