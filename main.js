
import cards from './cards.js';

let links = document.querySelector('.navigation-list');
let gameStatus = false;
let gameCardsStatus = '';
let startGameStatus = false;
let gameCompliteCounter = 0;


const rateString = document.createElement('div');
rateString.className = "game-string";
const winLoseBlock = document.createElement('div');
const winLoseMassage = document.createElement('div');
winLoseMassage.className = "win-or-lose--message";
winLoseBlock.className = "win-or-lose";
winLoseBlock.appendChild(winLoseMassage);

const wrap = document.querySelector('.wrapper');
const CHECK = document.querySelector('.train-switch');
const BUTTONG = document.createElement('button');
BUTTONG.textContent = 'Start Game';
BUTTONG.className = 'game-button';
const contentBlock = document.createElement('div');
contentBlock.className = 'content-block'
wrap.appendChild(contentBlock);

const burgerBlock = document.querySelector('.burger');
const burgerIcon = document.querySelector('.burger-icon');
const navigationBlock = document.querySelector('.navigation-block');

burgerBlock.onclick = function(){
    burgerIcon.classList.toggle('burger-icon-active');
    if(burgerIcon.classList.contains('burger-icon-active')){
        navigationBlock.classList.add('navigation-block-active');
    } else { 
        navigationBlock.classList.remove('navigation-block-active');
    }
}

function createCard(backgroundImg, word, translate, audioLink){
    let cardContainer = document.createElement('div');
    let card = document.createElement('div');
    let frontCard = document.createElement('div');
    let backCard = document.createElement('div');
    let rotate = document.createElement('div');
    let cardHeaderF = document.createElement('div');
    let cardHeaderB = document.createElement('div');
    cardContainer.className = 'card-container';
    card.className = 'card';
    frontCard.className = 'front-card';
    backCard.className = 'back-card';
    backCard.classList.add('card-active');
    rotate.className = 'rotate';
    cardHeaderF.className = 'card-header';
    cardHeaderB.className = 'card-header';

    if(gameStatus){
        cardHeaderF.classList.add('card--game');
        rotate.classList.add('card--game');
        frontCard.classList.add('front-card--game');
    }

    frontCard.id  = audioLink;

    card.appendChild(frontCard);
    frontCard.style.backgroundImage = `url(./${backgroundImg})`;
    cardHeaderF.textContent = word;
    frontCard.appendChild(cardHeaderF);

    backCard.style.backgroundImage = `url(./${backgroundImg})`;
    cardHeaderB.textContent = translate;
    backCard.appendChild(cardHeaderB);

    card.appendChild(frontCard);
    card.appendChild(backCard);
    card.appendChild(rotate);

    cardContainer.appendChild(card);

    contentBlock.appendChild(cardContainer);
}

function createMainCard(backgroundImg, cardTitle){
    let cardContainer = document.createElement('div');
    let card = document.createElement('div');
    let imga = document.createElement('img');
    let cardHeader = document.createElement('div');
    cardContainer.className = 'card-container';
    card.className = 'card--main';
    imga.className = 'main-card-img';
    cardHeader.className = 'card-header';

    if(gameStatus){
        card.classList.add('main--game');
    }

    imga.src = backgroundImg;
    cardHeader.textContent = cardTitle;
    card.appendChild(imga);
    card.appendChild(cardHeader);

    cardContainer.appendChild(card);

    contentBlock.appendChild(cardContainer);
}

function createStatiticEl(obj){
    let row = document.createElement('li');
    row.className = 'statistic-row';

    for(let el in obj){
        if(el == "word" || el == "translation" || el == "trainClick" || el == "successCllick" || el == "failedClick"){
            let rowEl = document.createElement('div');
            rowEl.textContent = obj[el];
            row.appendChild(rowEl);
        }
    }
    
    return row;
} 

function createStatistic(){
    for(let i = 0; i < cards[0].length; i++){
        let list  = document.createElement('ul');
        list.className = 'statistic-list';
        let listName = document.createElement('li');
        listName.className = "list-name";
        listName.textContent = cards[0][i];
        list.appendChild(listName);
        for(let j = 0; j < cards[i+1].length; j++){
            list.appendChild(createStatiticEl(cards[i+1][j]));
        }
        contentBlock.appendChild(list);
    }
}

function contentClear() {
    while(contentBlock.firstChild) {
       contentBlock.removeChild(contentBlock.firstChild);
    }
    if(rateString.firstChild){
        while(rateString.firstChild) {
            rateString.removeChild(rateString.firstChild);
         }
    }
}

function createMainPage(){
    let mas = cards[0];
    for(let i = 0; i < mas.length; i++){
        createMainCard(cards[i+1][0].image, mas[i]);
    }
    contentBlock.classList.add('main');
}

createMainPage();

function createCards(eventTextContent){
    if(eventTextContent != "Main Page" && eventTextContent != "Statistic"){
        let ind = cards[0].indexOf(eventTextContent);
        let mas = cards[ind+1];
        contentClear();
        contentBlock.appendChild(rateString);
        for(let i= 0; i < mas.length; i++){    
             createCard(mas[i].image, mas[i].word, mas[i].translation, mas[i].audioSrc);
        }
        let audio = document.createElement('audio');
        let audioAffects = document.createElement('audio');
        audio.className = 'audio';
        audioAffects.className = 'audio-affects';
        audio.src = "";
        audioAffects.src = "";
        audioAffects.autoplay = 'autoplay';
        contentBlock.appendChild(audio);
        contentBlock.appendChild(audioAffects);
        if(contentBlock.classList.contains('main')){
            contentBlock.classList.remove('main');
            contentBlock.classList.add('game-cards');
        }
        if(gameStatus){
            contentBlock.appendChild(BUTTONG);
            startGameStatus = false;
            BUTTONG.classList.remove('game-button-active');
        }
    }  else if(eventTextContent == "Main Page"){
        contentClear();
        createMainPage();
        if(contentBlock.classList.contains('game-cards')){
            contentBlock.classList.remove('game-cards');
            contentBlock.classList.add('main');
        }
    } else if(eventTextContent == "Statistic"){
        contentClear();

        createStatistic();
        console.log('lol');
    }
}

function getRandomInt(mas){
    return Math.floor(Math.random() * Math.floor(mas.length));
}

function gameMode(){
    console.log(gameCompliteCounter)
    let sounds = [];
    document.querySelectorAll('.front-card').forEach(el => {
        if(!el.classList.contains('front-card-compl')){
            sounds.push(el.id);
        }
    });
    let randomInt = getRandomInt(sounds);
    if(startGameStatus && sounds != []){
        document.querySelector('.audio').src = sounds[randomInt];
        document.querySelector('.audio').id  = sounds[randomInt];
        document.querySelector('.audio').autoplay = 'autoplay';
    }
    if(gameCompliteCounter == 8 && rateString.childNodes.length == 8){
        document.querySelector('.audio-affects').src = 'audio/success.mp3';
        winLoseMassage.textContent = "You are Won";
        contentBlock.prepend(winLoseBlock);
        setTimeout(() => {
            contentClear();
            createMainPage();
        }, 2500);
    } else if(gameCompliteCounter == 8 && rateString.childNodes.length != 8){
        document.querySelector('.audio-affects').src = 'audio/failure.mp3';
        winLoseMassage.textContent = `You are Lose, mistakes: ${rateString.childNodes.length-gameCompliteCounter}`;
        contentBlock.prepend(winLoseBlock);
        setTimeout(() => {
            contentClear();
            createMainPage();
        }, 2500);
    }
}

links.addEventListener('click', (event) => {
    createCards(event.target.textContent);
    gameCardsStatus = event.target.textContent;
    burgerIcon.classList.toggle('burger-icon-active');
    navigationBlock.classList.remove('navigation-block-active');
    document.querySelectorAll('.navigation-list li a').forEach(el => el.classList.remove('li-active'));
    if(!event.target.classList.contains('navigation-list')){
        event.target.classList.add('li-active');
    }
});

contentBlock.addEventListener('click', (event) => {
    if(contentBlock.classList.contains('game-cards') && gameStatus == false){
        if(event.target.classList.contains('front-card')){
            document.querySelector('.audio').src = event.target.id;
            document.querySelector('.audio').autoplay = 'autoplay';
        }
        if(event.target.classList.contains('rotate')){
            event.target.closest('.card').childNodes[1].classList.add('back-active');
            event.target.closest('.card').childNodes[0].classList.add('front-active');
            event.target.classList.add('rotate-none');
        }
    } else if(contentBlock.classList.contains('main')){
        if(event.target.classList.contains('card--main')){
            contentClear();
            contentBlock.classList.remove('main');
            contentBlock.classList.add('game-cards');
            createCards(event.target.textContent);
            gameCardsStatus = event.target.textContent;
        }
    } else if(gameStatus && startGameStatus){
        if( document.querySelector('.audio').id == event.target.id && event.target.classList.contains('front-card')){
            let starComplete = document.createElement('div');
            starComplete.className = 'star-compl';
            document.querySelector('.audio-affects').src = 'audio/correct.mp3';
            rateString.appendChild(starComplete);
            gameCompliteCounter++;
            event.target.classList.add('front-card-compl');
            setTimeout(gameMode, 1500); 
        } else if(event.target.classList.contains('front-card') && !event.target.classList.contains('front-card-compl') && document.querySelector('.audio').id != event.target.id){
            let starDefeate = document.createElement('div');
            starDefeate.className = 'star-defeate';
            document.querySelector('.audio-affects').src = 'audio/error.mp3';
            rateString.appendChild(starDefeate);
        }
    }
});

contentBlock.onmouseout = function(event) {
    if(contentBlock.classList.contains('game-cards') && gameStatus === false){
        if(event.target.classList.contains('card-container')){
            event.target.childNodes[0].childNodes[0].classList.remove('front-active');
            event.target.childNodes[0].childNodes[1].classList.remove('back-active');
            event.target.childNodes[0].childNodes[2].classList.remove('rotate-none');
        }
    }
};

CHECK.addEventListener('change', (event) => {
    if(event.target.checked){
        gameStatus = true;
        if(contentBlock.classList.contains('main')){
            contentClear();
            createMainPage();
        } else if(contentBlock.classList.contains('game-cards')){
            contentClear();
            createCards(gameCardsStatus);
        }
        document.querySelector('.navigation-block').classList.add('navigation-block--game');
    } else {
        gameStatus = false;
        startGameStatus = false;
        BUTTONG.classList.remove('game-button-active');
        if(contentBlock.classList.contains('main')){
            contentClear();
            createMainPage();
        } else if(contentBlock.classList.contains('game-cards')){
            contentClear();
            createCards(gameCardsStatus);
        }
        document.querySelector('.navigation-block').classList.remove('navigation-block--game');
    }
});

BUTTONG.addEventListener('click', (event) => {
    if(!event.target.classList.contains('game-button-active')){
        event.target.classList.add('game-button-active');
        startGameStatus = true;
        gameCompliteCounter = 0;
        gameMode();
    } else {
        let perAudio =  document.querySelector('.audio').id;
        document.querySelector('.audio').src = perAudio;
        document.querySelector('.audio').autoplay = 'autoplay';
    }
});




