/* L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata. */

/* Bonus
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe; */

const rowEl = document.getElementById('row_main');
const btn_play = document.getElementById('btn_play');
const difficultyEl = document.getElementById('difficulty');

btn_play.addEventListener('click', function () {
    rowEl.innerHTML = '';   //svuoto il precedente campo

    let numSquare = 0; //metto numero attraverso select
    if (difficultyEl.value == 'easy') {
        numSquare = 100;
    } else if (difficultyEl.value == 'medium') {
        numSquare = 81;
    } else {
        numSquare = 49;
    }

    campoMinato(numSquare);
});



/* ******* 
FUNCTIONS
******** */
function campoMinato(numCells) {

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
        colorSquare(squareEl, i);
    }
}

//*************
function colorSquare(element, index) {
    element.addEventListener('click', function () {
        this.classList.toggle('active');
        console.log(`Hai cliccato la cella numero ${index + 1}`);
        this.innerHTML = `<span> ${index + 1} </span>`;
    })
}