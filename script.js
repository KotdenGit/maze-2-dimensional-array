
const maze = [
  ['#','#','#','#','#','#','#','#','#'],

  ['#','+','+','+','#','+','+','+','#'],

  ['#','+','#','+','#','+','#','+','#'],

  ['+','+','#','+','0','+','#','+','#'],

  ['#','#','#','+','#','#','#','#','#'],

  ['#','#','+','+','#','#','#','#','#'],

  ['#','#','+','#','#','#','#','#','#'],

  ['#','#','#','#','#','#','#','#','#'],

];
const possibleAnswer = ['bottom','right','top','left','bottom','right','top','left'];
const optionMove = [[0, 1], [1, 0], [0, -1], [-1, 0], [0, 1], [1, 0], [0, -1]];
let answer = [];

let currentPosition = {
    col: 0,
    row: 0,

    get currentColPoint() {
        return this.col;
    },
    get currentRowPoint() {
        return this.row;
    },

    set actualColPoint(value) {
        this.col = value;
    },
    set actualRowPoint(value) {
        this.row = value;
    }
};

let lastPosition = {
    col: 0,
    row: 0,

    get lastColPoint() {
        return this.col;
    },

    get lastRowPoint() {
        return this.row;
    },

    set actualLastColPoint(value) {
        this.col = value;
    },
    set actualLastRowPoint(value) {
        this.row = value;
    }
};

function init () {
    findStartPositon(maze);
    findWay();
};

function findStartPositon() {
    for(i=0; maze.length>i; i++) {
        for (j=0; maze[i].length>j; j++) {
            if (maze[i][j] === "0") {
                currentPosition.actualRowPoint = i;
                currentPosition.actualColPoint = j;
                _actualLastPoint(j, i);
            }
        }
    }
};

function findWay () {
    let shiftStep = 0;
    for (;shiftStep < 4;){
        switch (true) {
            case moveTry(shiftStep) :
                moveTry(shiftStep, true);
                break;
            case !moveTry(shiftStep) :
                shiftStep++;
                answer = [];
                findStartPositon();
                break;   
        }
        if (foundWayOut()) break;   
    }  
};

function moveTry (step, move = false) {
    for (let side = 0; side < 4; side++) {
        let currentRowPoint = currentPosition.row + optionMove[step + side][1];
        let currentColPoint = currentPosition.col + optionMove[step + side][0];

        if (maze[currentRowPoint][currentColPoint] === "+" &&
        (currentColPoint !== lastPosition.lastColPoint || 
        currentRowPoint !== lastPosition.lastRowPoint)) {
            if(!move) {
                return true;
            } else {
                _actualLastPoint(currentPosition.col, currentPosition.row);
                currentPosition.actualColPoint = currentColPoint;
                currentPosition.actualRowPoint = currentRowPoint;
                answer.push(possibleAnswer[step + side]);
                return
            }
        }
        
    }
    return false;
};

function foundWayOut() {
    if (currentPosition.col === 0 || currentPosition.col === maze[0].length - 1 ||
        currentPosition.row === 0 || currentPosition.row === maze.length - 1) {
            window.alert(answer);
            return true;
        } else {
            return false;
        }
};

function _actualLastPoint(col, row) {
    lastPosition.actualLastColPoint = col;
    lastPosition.actualLastRowPoint = row;
}

window.addEventListener("DOMContentLoaded", function() {
    init();
});