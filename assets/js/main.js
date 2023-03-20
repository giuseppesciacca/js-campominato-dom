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

let points = 0;

btn_play.addEventListener('click', function () {
    rowEl.innerHTML = '';   //svuoto il precedente campo

    numSquare()
    const victoryCondition = numSquare() - 16;

    //create bombs and push them into array
    const bombArray = [];
    createBomb(numSquare(), bombArray);
    console.log(bombArray);

    campoMinato(numSquare(), bombArray, victoryCondition);
});

//quando clicchi bomba o quando apri tutte le celle che non sono bombe
//forse funzione che alla fine mi ritorna un booleano? 


/* ******* 
FUNCTIONS
******** */
function numSquare() {
    let numSquare = 0; //metto numero attraverso select
    if (difficultyEl.value == 'easy') {
        return numSquare = 100;
    } else if (difficultyEl.value == 'medium') {
        return numSquare = 81;
    } else {
        return numSquare = 49;
    }
}

//*************
function createBomb(numCells, array) {

    let i = 0;
    while (i < 16) {
        let bomb = Math.floor(Math.random() * (numCells - 1) + 1);

        //console.log(bomb);
        if (bomb in array) {
            array.pop(bomb);
            i--;
        } else {
            array.push(bomb);
            i++;
        }
    }
    i++
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

        const clickedCell = [];
        if (!(cell in clickedCell)) {
            clickedCell.push(cell);
        };

        console.log(clickedCell);
        points += clickedCell.length;
        console.log('Score ' + points);

        detectionBomb(index, array, element);

        if (points > 5) { //metto 5 per le prove
            resultEl.innerHTML = `YOU WIN <br> YOUR SCORE IS ${pointsWin}`
            console.log('WIN');
            overlayEl.classList.remove('d-none');
        }

    })
}

//**************
function detectionBomb(i, array, squareElement) {
    for (let j = 0; j < array.length; j++) {
        const element = array[j];

        if (i + 1 == element) {
            squareElement.classList.add('bomb');
            squareElement.innerHTML = `<i class="fa-solid fa-bomb fa-2x"></i>`;
            overlayEl.classList.remove('d-none');
        }
    }
}

//**************


//devo fare prima la condizione del tot bombe - 16 e dire che quella è la vittoria. controllarla ad ogni click. Occhio al contatore!