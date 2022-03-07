let jsData; // LEBIO repo information
const URL = "https://nebist-repositorio.github.io/BioDrive/script/data.json"



window.onload = function() {
    readJSON();

    // Change to right year

    division = window.location.href.split("/")
    page = division[division.length - 1]

    if (page !== "arquivo.html" && page !== "indexprivate.html" && page !== "encrypted.html" && page !== "index.html") {
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
        console.log(jsData);
    };
    xhr.send();
}



function goToYear(year) {
    window.location.href = "../html/ano.html?ano=" + year;
}




function appendHeader(value, func) {
    const header = document.getElementById("header_ano");

    if (header.getElementsByClassName(value).length == 0) {
        document.getElementById("header_ano").innerHTML +=
            `<i class = "fa-solid fa-angle-right fa-xs" ></i><a class="` + value + `" onclick=` + func + `>` + value + `</a>`;
    }
}

function removeHeader(value) {
    header = document.getElementById("header_ano");
    element = header.getElementsByClassName(value);

    // Element already created; we have to remove all childs
    if (element.length > 0) {
        var child = header.lastElementChild;

        while (child !== element[0]) {
            header.removeChild(child);
            child = header.lastElementChild;
        }
    }

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


function changeYear(year) {
    // Sets header 
    document.getElementById("header_ano").innerHTML =
        `<a onclick="changeYear('` + year + `')">` + year + `</a>`;
    addSemesters(year);
}


// Adds Semesters to Year on table body 
function addSemesters(year) {
    removeContent();

    document.getElementById("cont_table").innerHTML +=
        `<tr><td><a onclick="addCourses('` + year +
        `','1º Semestre')"> 1º Semestre </a></td></tr>
        <tr><td><a onclick="addCourses('` + year +
        `','2º Semestre')"> 2º Semestre </a></td></tr>`;
}


// Adds Courses to Semester on table body 
function addCourses(year, semester) {
    removeContent();
    removeHeader(semester);

    // function to comeback to courses
    const func = "\"addCourses('" + year + "','" + semester + "')\"";
    appendHeader(semester, func);

    table_body = document.getElementById("cont_table");
    for (let i in jsData[year][semester]) {
        table_body.innerHTML +=
            `<tr><td><a onclick="addFolders('` + year + `', '` + semester + `', '` + i + `' )">` + i + `</a>
            </td></tr>`;
    }
}

// Adds Folders to Courses on table body 
function addFolders(year, semester, course) {
    removeContent();
    removeHeader(course);
    const func = "\"addFolders('" + year + "','" + semester + "','" + course + "')\"";
    appendHeader(course, func);

    table_body = document.getElementById("cont_table");
    for (let i in jsData[year][semester][course]) {
        table_body.innerHTML +=
            `<tr><td><a>` + i + `</a></td></tr>`;
    }

}

// Adds Files to Folders on table body 
function addFiles(year, semester, course, folder) {
    removeContent();
    removeHeader(folder);
    const func = "\"addFiles('" + year + "','" + semester + "','" + course + "','" + folder + "')\"";
    appendHeader(course, func);

    table_body = document.getElementById("cont_table");
    for (let i in jsData[year][semester][course]) {
        table_body.innerHTML +=
            `<tr><td><a>` + i + `</a></td></tr>`;
    }
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


// MENU HAMBURGER

function toggleMobileMenu(menu) {
    menu.classList.toggle('open');
}