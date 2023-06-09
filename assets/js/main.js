/*  Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
In seguito l'utente clicca su una cella:
se il numero è presente nella lista dei numeri generati abbiamo calpestato una bomba la cella si colora di rosso e la partita termina.
Altrimenti la cella cliccata si colora di azzurro l'utente può continuare a cliccare sulle altre celle.

La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).

Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba. */

const rowEl = document.getElementById('row_main');
const btn_play = document.getElementById('btn_play');
const difficultyEl = document.getElementById('difficulty');
const overlayEl = document.getElementById('overlay');
const resultEl = document.getElementById('result');

let clickedCell = [];

btn_play.addEventListener('click', function () {
    overlayEl.classList.add('d-none');
    rowEl.innerHTML = '';   //svuoto il precedente campo
    clickedCell = [];       //on click empty array

    //create the squares and the victory condition
    let numCell = numSquare()
    const victoryCondition = numCell - 16;

    //create bombs and push them into array
    const bombArray = createBomb(numCell);

    //make colums + event listner on click square
    campoMinato(numCell, bombArray, victoryCondition);
});



/* ******* 
FUNCTIONS
******** */
function numSquare() {
    let numSquare = 0; //metto numero attraverso select
    if (difficultyEl.value == 'easy') {
        numSquare = 100;
    } else if (difficultyEl.value == 'medium') {
        numSquare = 81;
    } else {
        numSquare = 49;
    }
    return numSquare;
}

//*************
function createBomb(numCells) {
    const bombArray = [];

    while (bombArray.length < 16) {
        let bomb = Math.floor(Math.random() * (numCells - 1) + 1);

        if (!bombArray.includes(bomb)) {
            bombArray.push(bomb);
        }
    }
    return bombArray;
}

//**************
function campoMinato(numCells, array, pointsWin) {

    for (let i = 0; i < numCells; i++) {
        const squareEl = document.createElement('div');
        squareEl.classList.add('col_my', 'd-flex', 'align-items-center', 'justify-content-center');

        if (numCells == 100) {
            squareEl.classList.add('col_my_ez')
        } else if (numCells == 81) {
            squareEl.classList.add('col_my_md')
        } else {
            squareEl.classList.add('col_my_hd')
        }

        rowEl.append(squareEl);

        //al click, coloro + log;
        userAction(squareEl, i, array, pointsWin);
    }
}

//************* FUNZIONE CLICK DELL'ELEMENTO
function userAction(element, index, array, pointsWin) {
    element.addEventListener('click', function () {
        this.classList.add('active');
        console.log(`Hai cliccato la cella numero ${index + 1}`);
        this.innerHTML = `<span> ${index + 1} </span>`;
        let cell = (index + 1);

        if (!clickedCell.includes(cell) && !array.includes(cell)) {
            clickedCell.push(cell);
        };

        if (array.includes(cell)) {
            this.classList.add('bomb');
        };

        console.log(clickedCell);
        points = clickedCell.length;
        console.log('Score ' + points);

        detectionBomb(index, array, points);

        if (points == pointsWin) {
            resultEl.innerHTML = `YOU WIN <br> YOUR SCORE IS ${points}`
            console.log('WIN');
            overlayEl.classList.remove('d-none');
        }

    })
}

//************** CHECK IF CLICKED CELL IS A BOMB
function detectionBomb(i, array, points) {
    for (let j = 0; j < array.length; j++) {
        const element = array[j];

        if (i + 1 == element) {
            // show all bombs 
            const allSquareEl = document.querySelectorAll('.col_my')
            // loop over the squares 
            for (let i = 0; i < allSquareEl.length; i++) {
                const square = allSquareEl[i];
                // check if the square content its included inside the bombArray
                const squareNumber = Number(i + 1)
                if (array.includes(squareNumber)) {
                    square.classList.add('active');
                    square.innerHTML = `<i class="fa-solid fa-bomb fa-2x"></i>`;
                }
            }
            overlayEl.classList.remove('d-none');
            resultEl.innerHTML = `YOU LOSE <br> YOUR SCORE IS ${points}`
        }
    }
}