const CHESS_ROWS = 8;
const CHESS_COLUMNS = 8;

function getMatrixChessBoard() {
    let res = [];
    res.length = CHESS_ROWS;
    return [...res].
        map((v, indexOfRow) => `<div class="row"> ${setEvenOddColumns(indexOfRow)} </div>`).join("");
}

//0=false
//1=true
function setEvenOddColumns(indexOfRow) {
    let res = [];
    res.length = CHESS_COLUMNS;
    return [...res].
        map((v, indexOfColumn) => `<div class="${getColouredColumn(indexOfRow, indexOfColumn)} desk cell"> </div>`).join("");
}

function getColouredColumn(indexOfRow, indexOfColumn) {
    return !(indexOfRow % 2) && !(indexOfColumn % 2) || 
    (indexOfRow % 2) && (indexOfColumn % 2) ? "white" : "black";
}

bodyId.innerHTML = getMatrixChessBoard();