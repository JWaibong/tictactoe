let gameBoard = (function(){
    "use-strict";
    let currentSpace = null;
    let _board = [null, null, null,
                  null, null, null,
                  null, null, null];
    function setBoard(value){
        _board[currentSpace] = value;
    }
    function setCurrentSpace(index){
        currentSpace = index;
    }
    function showCurrentSpace(){
        console.log(currentSpace);
    }

    function showBoard(){
        console.log(_board);
    }
    return{ setBoard, showBoard, setCurrentSpace, showCurrentSpace,};
    
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
console.log(p1.isMyTurn());

const p2 = Player("Player 2");
console.log(p2.isMyTurn());

let gridSpaces = document.querySelectorAll(".board");
gridSpaces.forEach((grid,index) => {
    grid.addEventListener("click", () => {
        gameBoard.setCurrentSpace(index);
        gameBoard.setBoard(p1.isMyTurn());
        p1.toggleTurn();
        p2.toggleTurn();
        gameBoard.showCurrentSpace();
        gameBoard.showBoard();
    });
});
