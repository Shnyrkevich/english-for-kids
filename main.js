
import cards from './cards.js';

let gameStatus = false;
let gameCardsStatus = '';
let startGameStatus = false;
let gameCompliteCounter = 0;
let statistcData;
let buttonReset = document.createElement('button');
let buttonRepeatDifficultWords = document.createElement('button');
buttonReset.className = 'button-statistic';
buttonRepeatDifficultWords.className = 'button-statistic';

if(!('data' in localStorage)){
    localStorage.setItem('data', JSON.stringify(cards));
    statistcData = JSON.parse(localStorage.data);
} else {
    statistcData = JSON.parse(localStorage.data);
}

const rateString = document.createElement('div');
rateString.className = "game-string";
const winLoseBlock = document.createElement('div');
const winLoseMassage = document.createElement('div');
winLoseMassage.className = "win-or-lose--message";
winLoseBlock.className = "win-or-lose";
winLoseBlock.appendChild(winLoseMassage);

const burgerBlock = document.querySelector('.burger');
const burgerIcon = document.querySelector('.burger-icon');
const navigationBlock = document.querySelector('.navigation-block');
const links = document.querySelector('.navigation-list');
const wrap = document.querySelector('.wrapper');
const CHECK = document.querySelector('.train-switch');
const BUTTONG = document.createElement('button');
BUTTONG.textContent = 'Start Game';
BUTTONG.className = 'game-button';
const contentBlock = document.createElement('div');
contentBlock.className = 'content-block'
wrap.appendChild(contentBlock);

//create game card with sound
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

//create main card on mane page
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

//create create row in statistic table
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

//create statistic
function createStatistic(){
    let masNames = ['Word', 'Translate', 'Training Press', 'Successful Click','Erroneous Click'];
    for(let i = 0; i < statistcData[0].length; i++){
        let list  = document.createElement('ul');
        list.className = 'statistic-list';
        let listName = document.createElement('li');
        listName.className = "list-name";
        listName.textContent = statistcData[0][i];
        list.appendChild(listName);
        let columnName = document.createElement('li');
        columnName.className = 'statistic-row';
        columnName.classList.add('statistic-row--first');
        for(let i = 0; i < masNames.length; i++){
            let name = document.createElement('div');
            name.textContent = masNames[i];
            columnName.appendChild(name);   
        }
        list.appendChild(columnName);
        for(let j = 0; j < statistcData[i+1].length; j++){
            list.appendChild(createStatiticEl(statistcData[i+1][j]));
        }
        contentBlock.appendChild(list);
    }
    let buttonBlock = document.createElement('div');
    buttonBlock.className = 'button-block';
    buttonReset.textContent = "Reset";
    buttonRepeatDifficultWords.textContent = "Repeat difficult words";
    buttonBlock.appendChild(buttonReset);
    buttonBlock.appendChild(buttonRepeatDifficultWords);
    contentBlock.appendChild(buttonBlock);
}

//clean content block
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

//create main page call createMainCard
function createMainPage(){
    let mas = cards[0];
    for(let i = 0; i < mas.length; i++){
        createMainCard(cards[i+1][0].image, mas[i]);
    }
    document.querySelectorAll('.navigation-list li a').forEach( el => {
        if(el.textContent == 'Main Page'){
            el.classList.add('li-active');
        }
    });
    contentBlock.classList.add('main');
}

//create audio block for game cards
function createAudioBlock(){
    let audio = document.createElement('audio');
    let audioAffects = document.createElement('audio');
    audio.className = 'audio';
    audioAffects.className = 'audio-affects';
    audio.src = "";
    audioAffects.src = "";
    audioAffects.autoplay = 'autoplay';
    contentBlock.appendChild(audio);
    contentBlock.appendChild(audioAffects);
}

//call create main page when page loaded
createMainPage();

//create game field in different cases
function createCards(eventTextContent){
    if(eventTextContent != "Main Page" && eventTextContent != "Statistic"){
        let ind = cards[0].indexOf(eventTextContent);
        let mas = cards[ind+1];
        contentClear();
        contentBlock.appendChild(rateString);
        for(let i= 0; i < mas.length; i++){    
             createCard(mas[i].image, mas[i].word, mas[i].translation, mas[i].audioSrc);
        }
        createAudioBlock();
        if(contentBlock.classList.contains('main') || contentBlock.classList.contains('statistic')){
            contentBlock.classList.remove('main');
            contentBlock.classList.remove('statistic');
            contentBlock.classList.add('game-cards');
        }
        if(gameStatus){
            contentBlock.appendChild(BUTTONG);
            startGameStatus = false;
        }
    }  else if(eventTextContent == "Main Page"){
        contentClear();
        createMainPage();
        if(contentBlock.classList.contains('game-cards') || contentBlock.classList.contains('statistic')){
            contentBlock.classList.remove('game-cards');
            contentBlock.classList.remove('statistic');
            contentBlock.classList.add('main');
        }
    } else if(eventTextContent == "Statistic"){
        contentClear();
        createStatistic();
        if(contentBlock.classList.contains('game-cards') || contentBlock.classList.contains('main')){
            contentBlock.classList.remove('game-cards');
            contentBlock.classList.remove('main');
            contentBlock.classList.add('statistic');
        }
    }
}

//get random number for random audio play
function getRandomInt(mas){
    return Math.floor(Math.random() * Math.floor(mas.length));
}

//function what calling when you click on game card
function gameMode(){
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

//find position block position 
function findPos(fieldStatus, auidioId){
    let indField = statistcData[0].indexOf(fieldStatus);
    let indObj = 0;

    for(let i = 0; i < statistcData[indField+1].length; i++){
        for(let el in statistcData[indField+1][i]){
            if(statistcData[indField+1][i][el] == auidioId){
                indObj = i;
            }
        }
    }
    return [indField+1, indObj];

}

// find block with small success carioty
function findLessVariotyWords(){
    let masIndexes = [];
    let varioty = 0;
    for(let i = 1; i < statistcData.length; i++){
        let indexWord = [];
        let wordPosition = 0;
        varioty = 0;
        for(let j = 0; j < statistcData[i].length; j++){
            if(statistcData[i][j].failedClick != 0){
                let varioty1 = statistcData[i][j].failedClick/(statistcData[i][j].successCllick+statistcData[i][j].failedClick);
                if(varioty1 > varioty){
                    varioty = varioty1;
                    wordPosition = j;
                } 
                indexWord = [i, wordPosition];
                //console.log(indexWord);
            }
        }
        if(indexWord.length != 0){
            masIndexes.push(indexWord);
        }
    }   
    return masIndexes;
}

//create statistic cards
function createCardsForStatic(){
    let wordsMas = findLessVariotyWords();
    contentClear();
    for(let i = 0; i < wordsMas.length; i++){    
         createCard(statistcData[wordsMas[i][0]][wordsMas[i][1]].image, statistcData[wordsMas[i][0]][wordsMas[i][1]].word, statistcData[wordsMas[i][0]][wordsMas[i][1]].translation, statistcData[wordsMas[i][0]][wordsMas[i][1]].audioSrc);
    }
    contentBlock.classList.remove('statistic');
    contentBlock.classList.add('game-cards');
    createAudioBlock();
}

// ** visability navigation-panel
function removeNavigationPanel(event){
    if(!event.target.classList.contains('navigation-list')){
        burgerIcon.classList.remove('burger-icon-active');
        navigationBlock.classList.remove('navigation-block-active');
    }
}

// == Listeners == //

burgerBlock.onclick = function(){
    burgerIcon.classList.toggle('burger-icon-active');
    if(burgerIcon.classList.contains('burger-icon-active')){
        navigationBlock.classList.add('navigation-block-active');
    } else { 
        navigationBlock.classList.remove('navigation-block-active');
    }
}

links.addEventListener('click', (event) => {
    if(!event.target.classList.contains('navigation-list')){
        createCards(event.target.textContent);
        gameCardsStatus = event.target.textContent;
        burgerIcon.classList.toggle('burger-icon-active');
        navigationBlock.classList.remove('navigation-block-active');
        document.querySelectorAll('.navigation-list li a').forEach(el => el.classList.remove('li-active'));
        event.target.classList.add('li-active');
    }
});

navigationBlock.onclick = function(event){
    removeNavigationPanel(event);
}

contentBlock.addEventListener('click', (event) => {
    if(contentBlock.classList.contains('game-cards') && gameStatus == false){
        if(event.target.classList.contains('front-card')){
            document.querySelector('.audio').src = event.target.id;
            document.querySelector('.audio').autoplay = 'autoplay';
            if(gameCardsStatus != 'Statistic'){
                let indexMas = findPos(gameCardsStatus, event.target.id);
                statistcData[indexMas[0]][indexMas[1]].trainClick += 1;
            }
        }
        if(event.target.classList.contains('rotate')){
            event.target.closest('.card').childNodes[1].classList.add('back-active');
            event.target.closest('.card').childNodes[0].classList.add('front-active');
            event.target.classList.add('rotate-none');
        }
    } else if(contentBlock.classList.contains('main')){
        if(event.target.classList.contains('main-card-img') || event.target.classList.contains('card--main')){
            let textCont = event.target.closest('.card-container').childNodes[0].childNodes[1].textContent;
            contentClear();
            contentBlock.classList.remove('main');
            contentBlock.classList.add('game-cards');
            createCards(textCont);
            gameCardsStatus = textCont;
            document.querySelectorAll('.navigation-list li a').forEach( el => {
                if(el.textContent == textCont){
                    el.classList.add('li-active');
                } else if(el.textContent == 'Main Page'){
                    el.classList.remove('li-active');
                }
            });
        }
    } else if(gameStatus && startGameStatus){
        if( document.querySelector('.audio').id == event.target.id && event.target.classList.contains('front-card')){
            let starComplete = document.createElement('div');
            starComplete.className = 'star-compl';
            document.querySelector('.audio-affects').src = 'audio/correct.mp3';
            rateString.appendChild(starComplete);
            gameCompliteCounter++;
            event.target.classList.add('front-card-compl');
            let indexMas = findPos(gameCardsStatus, event.target.id);
            statistcData[indexMas[0]][indexMas[1]].successCllick +=1; 
            setTimeout(gameMode, 1500); 
        } else if(event.target.classList.contains('front-card') && !event.target.classList.contains('front-card-compl') && document.querySelector('.audio').id != event.target.id){
            let starDefeate = document.createElement('div');
            starDefeate.className = 'star-defeate';
            document.querySelector('.audio-affects').src = 'audio/error.mp3';
            rateString.appendChild(starDefeate);
            let indexMas = findPos(gameCardsStatus, document.querySelector('.audio').id);
            statistcData[indexMas[0]][indexMas[1]].failedClick +=1; 
        }
    }
    removeNavigationPanel(event);
    localStorage.data = JSON.stringify(statistcData);
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
        } else if(contentBlock.classList.contains('game-cards') && gameCardsStatus != 'Statistic'){
            contentClear();
            createCards(gameCardsStatus);
        } else if(contentBlock.classList.contains('game-cards') && gameCardsStatus == 'Statistic'){
            createCardsForStatic();
        }
        document.querySelector('.navigation-block').classList.add('navigation-block--game');
    } else {
        gameStatus = false;
        startGameStatus = false;
        BUTTONG.classList.remove('game-button-active');
        if(contentBlock.classList.contains('main')){
            contentClear();
            createMainPage();
        } else if(contentBlock.classList.contains('game-cards') && gameCardsStatus != 'Statistic'){
            contentClear();
            createCards(gameCardsStatus);
        } else if(contentBlock.classList.contains('game-cards') && gameCardsStatus == 'Statistic'){
            createCardsForStatic();
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

buttonReset.addEventListener('click', () => {
    statistcData = cards;
    localStorage.data = JSON.stringify(statistcData);
    contentClear();
    createStatistic();
});

buttonRepeatDifficultWords.addEventListener('click', () => {
    createCardsForStatic();
    gameCardsStatus = 'Statistic';
});

