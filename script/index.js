let jsData; // LEBIO repo information
const URL = "https://nebist-repositorio.github.io/BioDrive/script/data.json"



window.onload = function() {
    readJSON();
    console.log(jsData);

    // Change to right year

    division = window.location.href.split("/")
    page = division[division.length - 1]

    if (page !== "arquivo.html" && page !== "indexprivate.html") {
        let queryString = window.location.search;
        let urlParams = new URLSearchParams(queryString);
        let year = urlParams.get('ano');
        changeYear(year);
    }

}


function readJSON() {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', URL, true);
    xhr.responseType = 'json';

    xhr.onload = function() {
        jsData = xhr.response;
        console.log(jsData.ano1);
    };
    xhr.send();
}



function goToYear(year) {
    window.location.href = "../html/ano.html?ano=" + year;
}


function changeYear(year) {
    addSemesters(year);
    document.getElementById("header_ano").innerHTML = year;
}


// removes all nodes from table body
function removeContent() {
    content = document.getElementById("cont_table");

    var child = content.lastElementChild;
    while (child) {
        content.removeChild(child);
        child = content.lastElementChild;
    }

}

// adds Semesters and functions to add courses
function addSemesters(year) {
    removeContent();
    document.getElementById("cont_table").innerHTML +=
        `<tr><td><a onclick="addCourses('` + year +
        `','1º Semestre')"> 1º Semestre </a></td></tr>
        <tr><td><a onclick="addCourses('` + year +
        `','2º Semestre')"> 2º Semestre </a></td></tr>`
}


function addCourses(year, semester) {
    table_body = document.getElementById("cont_table");

    console.log("Year: " + jsData["1º Ano"])

    for (let i = 0; i < jsData.year.semester.length; i++) {
        table_body.innerHTML +=
            `<tr><td><a>` + jsData[year].semester[i] + '</a></td></tr>'
    }

    // tr = document.createElement("tr");
    // td = document.createElement("td");

    // a = document.createElement("a");

    // i = document.createElement("i");
    // i.setAttribute("class", "fa-solid fa-eye fa-lg")

    // a.appendChild(i)
    // td.appendChild(td)

    // td_text = document.createTextNode(i + "º Semestre");

    // td.appendChild(td_text);
    // tr.appendChild(td);
    // tabela.appendChild(tr);
}





// MENU HAMBURGER

function toggleMobileMenu(menu) {
    menu.classList.toggle('open');
}