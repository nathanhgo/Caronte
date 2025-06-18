let menuBtn1 = document.querySelector('#menuBtn1');
let accordionButton1 = document.querySelector('#accordionButton1');

let menuBtn2 = document.querySelector('#menuBtn2');
let accordionButton2 = document.querySelector('#accordionButton2');

let menuBtn3 = document.querySelector('#menuBtn3');
let accordionButton3 = document.querySelector('#accordionButton3');

let menuBtn4 = document.querySelector('#menuBtn4');
let accordionButton4 = document.querySelector('#accordionButton4');

menuBtn1.addEventListener('click', () => {
    accordionButton1.click()
});

menuBtn2.addEventListener('click', () => {
    accordionButton2.click()
});

menuBtn3.addEventListener('click', () => {
    accordionButton3.click()
});

menuBtn4.addEventListener('click', () => {
    accordionButton4.click()
});