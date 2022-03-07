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
    };
    xhr.send();
}



function goToYear(year) {
    window.location.href = "../html/ano.html?ano=" + year;
}

function appendHeader(value, func) {
    const header = document.getElementById("header_ano");
    element = header.getElementsByClassName(value);

    if (element.length == 0) {
        header.innerHTML += `<i class = "fa-solid fa-angle-right fa-xs" ></i><a class="` + value + `" onclick=` + func + `>` + value + `</a>`;
    } else {
        // Element already created; we have to remove all childs
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
        `<tr><td><a onclick="addGlobal('` + year + `/1º Semestre')"> 1º Semestre </a></td></tr> 
         <tr><td><a onclick="addGlobal('` + year + `/2º Semestre')"> 2º Semestre </a></td></tr>`;
}


function addGlobal(path) {
    removeContent();
    const path_split = path.split('/');
    const path_len = path_split.length;
    const func = "\"addGlobal('" + path + "')\"";


    let jsData_copy = jsData;
    for (let i = 0; i < path_len; i++) {
        jsData_copy = jsData_copy[path_split[i]];
    }

    let location = path_split[path_len - 1];
    if (location === "folder")
        location = jsData_copy.name

    appendHeader(location, func);

    table_body = document.getElementById("cont_table");
    for (let i in jsData_copy) {
        if (i === "files") {
            displayFiles(jsData_copy["files"]);
        } else {
            let suffix = i;
            if (i === "folder") {
                suffix = jsData_copy["folder"].name;
            }
            if (i !== "name") {
                new_path = path + "/" + i;
                table_body.innerHTML += `<tr><td colspan="2"><a onclick="addGlobal('` + new_path + `')">` + suffix + `</a></td></tr>`;
            }
        }
    }
}


function displayFiles(data) {
    table_body = document.getElementById("cont_table");
    for (let file in data) {
        table_body.innerHTML += `
    <tr>
        <td><a href="https://drive.google.com/file/d/` + data[file].id + `/view "> ` + data[file].name + `</a></td>
        <td><a href="https://drive.google.com/uc?export=download&id=` + data[file].id + ` "><i class="fa-solid fa-download fa-lg "></i></td>
    </tr>`
    }
}




// MENU HAMBURGER

function toggleMobileMenu(menu) {
    menu.classList.toggle('open');
}