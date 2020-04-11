
import cards from './cards.js';

let links = document.querySelector('.navigation-list');


const wrap = document.querySelector('.wrapper');
const contentBlock = document.createElement('div');
contentBlock.className = 'content-block';
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


function contentClear() {
    while(contentBlock.firstChild) {
       contentBlock.removeChild(contentBlock.firstChild);
    }
}

links.addEventListener('click', (event) => {
    let ind = cards[0].indexOf(event.target.textContent);
    let mas = cards[ind+1];
    contentClear();
    for(let i = 0; i < mas.length; i++){
        createCard(mas[i].image, mas[i].word, mas[i].translation, mas[i].audioSrc);
    }
    let audio = document.createElement('audio');
    audio.className = 'audio';
    audio.src = "";
    contentBlock.appendChild(audio);
    burgerIcon.classList.toggle('burger-icon-active');
    navigationBlock.classList.remove('navigation-block-active');
});

contentBlock.addEventListener('click', (event) => {
    if(event.target.classList.contains('front-card')){
        document.querySelector('.audio').src = event.target.id;
        document.querySelector('.audio').autoplay = 'autoplay';
    }
    if(event.target.classList.contains('rotate')){
        event.target.closest('.card').childNodes[1].classList.add('back-active');
        event.target.closest('.card').childNodes[0].classList.add('front-active');
        event.target.classList.add('rotate-none');
    }
});

contentBlock.onmouseout = function(event) {
    if(event.target.classList.contains('card-container')){
        event.target.childNodes[0].childNodes[0].classList.remove('front-active');
        event.target.childNodes[0].childNodes[1].classList.remove('back-active');
        event.target.childNodes[0].childNodes[2].classList.remove('rotate-none');
    }
}


