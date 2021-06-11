let gameBoard = (function(){
    "use-strict";
    let _currentSpace = null;
    let _moves = 0;
    let _board = [null, null, null,
                  null, null, null,
                  null, null, null];
    function setBoard(value){
        if(_board[_currentSpace] === null){
            _board[_currentSpace] = value;
            _moves++;
            p1.toggleTurn();
            p2.toggleTurn();
        }

    }
    function setCurrentSpace(index){
        _currentSpace = index;
    }
    function showCurrentSpace(){
        console.log(_currentSpace);
    }

    function showBoard(){
        console.log(_board);
    }
    function updateBoard(){
        // gridSpaces.forEach((grid,index) => grid.textContent = (_board[index] === null)? "" : (_board[index] === 1)? "X": "O");
        if(_currentSpace != null){
            const gridToUpdate = document.getElementById(`grid${_currentSpace}`);
            gridToUpdate.textContent = (_board[_currentSpace] === 1)? "X" : "O";
        }
    }
    function _checkWin(){
        let diag = _checkDiagonals();
        let rows = _checkRows();
        let columns = _checkColumns();
        return ((diag !== null)? diag: (rows !== null)? rows: (columns !== null)? columns : (_moves >= 9)? "Tie": null);
    }
    function _checkDiagonals(){
        if(_board[4] != null){
           return ((_board[0] === _board[4] && _board[4] === _board[8]) || (_board[2] === _board[4] && _board[4] === _board[6]))? _board[4] : null;
        }
        return null;
    }
    function _checkRows(){
        for(let i=0; i<=6; i+=3){
            if(_board[i] != null){
                if(_board[i] === _board[i+1] && _board[i+1] ===  _board[i+2]){
                    return _board[i];
                }
            }
        }
        return null;
    }
    function _checkColumns(){
        for(let i=0; i<3; i++){
            if(_board[i] != null){
                if(_board[i] === _board[i+3] && _board[i+3] ===  _board[i+6]){
                    return _board[i];
                }
            }
        }
        return null; 
    }
    function determineWinner(){
        const player = _checkWin();
        document.querySelector("#winner").textContent = (player == 1)? "X is the Winner!" : (player == 0)? "O is the Winner!" : (player === "Tie")? player : null;
    }
    function reset(){
        _moves = 0; 
        _currentSpace = null;
        _board.forEach((value,index) => _board[index] = null);
        document.querySelectorAll(".board").forEach(grid => grid.textContent = "");
        document.querySelector("#winner").textContent = "";
    }
    return{setBoard, showBoard, setCurrentSpace, showCurrentSpace, updateBoard, determineWinner,reset};
    
}());

const Player = (name) => {
    let myTurn = false; 
    const sayPlayerName = () => console.log(name);
    const toggleTurn = () => {myTurn = !myTurn;}
    const isMyTurn = () => {return (myTurn)? 1: 0};
    const getTurn = () => console.log(myTurn);
    return Object.assign({}, {sayPlayerName, toggleTurn, getTurn, isMyTurn,});
}

const p1 = Player("Player 1");
p1.toggleTurn();

const p2 = Player("Player 2");

let gridSpaces = document.querySelectorAll(".board");
gridSpaces.forEach((grid,index) => {
    grid.addEventListener("click", () => {
        gameBoard.setCurrentSpace(index);
        gameBoard.setBoard(p1.isMyTurn());
        gameBoard.updateBoard();
        gameBoard.determineWinner()
    });
});

let reset = document.querySelector("#reset");
reset.addEventListener("click", e => {
    gameBoard.reset();
});
