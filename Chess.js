// Inserting the Images for the characters
function insertImage() {
    document.querySelectorAll('.box').forEach(image => {
        if (image.innerText.length !== 0) {
            image.innerHTML = `${image.innerText} <img width="40px" height="40px" class='allimg allpawn' src="${image.innerText}.png" alt="">`
            image.style.cursor = 'pointer'
        }
    })
}
insertImage()

let selectedBox = null;
let selectedBoxClassName = null;

function selectBox() {
    document.querySelectorAll('.box').forEach( box => {
        box.addEventListener('click', ()=>{
            if(box.innerHTML.includes("img")){
                if(selectedBox == null && selectedBoxClassName == null){
                    greenOtherSpaces(box.id, false);
                    selectedBox = box;
                    selectedBoxClassName = box.className;

                }
                else if(selectedBox != box){
                    greenOtherSpaces(box.id, true);
                    //remove old select
                    selectedBox.className = selectedBoxClassName;
                    selectedBoxClassName = box.className;
                    //update new select
                    selectedBox = box;
                }
                movePiece(box.id);
            }
        })
    })
}
selectBox();

let selectedBoxFreePaths = null;
let canMovePathsArrayRow = [];
let canMovePathsArrayColumn = [];

function greenOtherSpaces(id, firstTimeClick) {
    if(firstTimeClick){
        resetGreenSpace();
    }

    selectedBoxFreePaths = id.split(" ");
    let row = selectedBoxFreePaths[0].replace("r","");
    let column = selectedBoxFreePaths[1].replace("c","");
    

    rowSelectLeft();
    rowSelectRight();
    columnSelectAbove();
    columnSelectBelow();    

    //row selected
    function rowSelectLeft(){
        for (let i = column - 1 ; i >= 1; i--) {
            let canMoveBox = document.getElementById(`r${row} c${i}`);
            if(canItMoveThere(canMoveBox)){
                canMovePathsArrayRow.push(canMoveBox);
                canMoveBox.className += " green";
            } else break;
        
        }
    }
    function rowSelectRight(){
    
        let columnRight = +column + 1;
        for (let i = columnRight ; i < 12; i++) {
            let canMoveBox = document.getElementById(`r${row} c${i}`);
            if(canItMoveThere(canMoveBox)){
                canMovePathsArrayRow.push(canMoveBox);
                canMoveBox.className += " green";
            } else break;
        
        }
    }

    //columnSelected
    function columnSelectAbove(){
        let rowAbove = +row + 1;
        for (let i = rowAbove ; i < 12; i++) {
            let canMoveBox = document.getElementById(`r${i} c${column}`);
            if(canItMoveThere(canMoveBox)){
                canMovePathsArrayColumn.push(canMoveBox);
                canMoveBox.className += " green";
            } else break;
        
        }
    }
    function columnSelectBelow(){
        for (let i = row - 1 ; i >= 1; i--) {
            let canMoveBox = document.getElementById(`r${i} c${column}`);
            if(canItMoveThere(canMoveBox)){
                canMovePathsArrayColumn.push(canMoveBox);
                canMoveBox.className += " green";
            } else break;
        }
    }
}

function canItMoveThere(element){
    if(element.innerText == '') return true;
}

let lastClickedElementObject = {
    type : "",
    position : ""
}

let lastClickedElement = null;

function pieceIsClicked(pieceId){
    lastClickedElement = document.getElementById(pieceId).innerHTML;
    lastClickedElementObject.type = lastClickedElement.includes("Attack")? "Attack" : "Defend";
    lastClickedElementObject.position = pieceId;
    console.log(lastClickedElementObject);
}

function clickToMove(){
    document.querySelectorAll('.box.green').forEach( box => {
        console.log("clicked");
        box.addEventListener('click', ()=>{
            box.innerHTML = `${lastClickedElementObject.type} <img width="40px" height="40px" class='allimg allpawn' src="${lastClickedElementObject.type}.png" alt="">`;
            box.style.cursor = 'pointer';   
            resetMovedPiece();
            resetGreenSpace();
        });
    })
}
function movePiece(id){
    console.log(id)
    pieceIsClicked(id)
    clickToMove();
}

function resetMovedPiece(){
    document.getElementById(lastClickedElementObject.position).innerHTML="";

    lastClickedElementObject.type = "";
    lastClickedElementObject.position = "";
    lastClickedElement = "";  
}


function resetGreenSpace(){   
    canMovePathsArrayRow.forEach(canMoveBox => {
        canMoveBox.className = canMoveBox.className.replace(" green","") 
    });

    canMovePathsArrayColumn.forEach(canMoveBox => {
        canMoveBox.className = canMoveBox.className.replace(" green","") 
    });
}

