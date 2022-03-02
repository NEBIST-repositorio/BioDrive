let jsData; // LEBIO repo information
const URL = "https://nebist-repositorio.github.io/BioDrive/script/data.json"



window.onload = function() {
    readJSON();
};


function readJSON() {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', URL, true);
    xhr.responseType = 'json';

    xhr.onload = function() {
        jsData = xhr.response;
        console.log(jsData);
    };
    xhr.send();
}

function addToTable(value) {
    console.log(value);
    console.log(jsData[value]);
}

function toggleMobileMenu(menu) {
    menu.classList.toggle('open');
}