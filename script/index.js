let jsData; // LEBIO repo information
const URL = "https://nebist-repositorio.github.io/BioDrive/script/data.json"



window.onload = () => {
    displayPage();
}


async function displayPage() {
    jsData = await (await fetch(URL)).json();
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let path = urlParams.get('local');

    if (path !== null) {
        addGlobal(path);
    }
}

function setLocal(local) {
    window.location.href = `../html/ano.html?local=${local}`;
}


function createHeader(path, path_len) {
    const header = document.getElementById("header_ano");
    let jsData_copy = jsData;
    let sum_path = "";

    for (var i = 0; i < path_len - 1; i++) {
        var value = path[i];
        sum_path += value;
        jsData_copy = jsData_copy[value];

        if (value === "folder") {
            value = jsData_copy.name;
        }
        header.innerHTML += `<a onclick="setLocal('${sum_path}')">${value}</a><i class="fa-solid fa-angle-right fa-xs"></i>`;
        sum_path += `/`;
    }
    value = path[i];
    sum_path += value;
    jsData_copy = jsData_copy[value];

    if (value === "folder") {
        value = jsData_copy.name;
    }
    header.innerHTML += `<a onclick="setLocal('${sum_path}')">${value}</a>`;

    return jsData_copy;
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


function addGlobal(path) {
    const path_split = path.split('/');
    const path_len = path_split.length;

    let jsData_copy = createHeader(path_split, path_len);

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
                table_body.innerHTML += `<tr><td colspan="2"><a onclick="setLocal('${new_path}')">${suffix}</a></td></tr>`;
            }
        }
    }
}


function displayFiles(data) {
    table_body = document.getElementById("cont_table");
    for (let file in data) {
        table_body.innerHTML += `
    <tr>
        <td><a href="https://drive.google.com/file/d/${data[file].id}/view">${data[file].name}</a></td>
        <td><a href="https://drive.google.com/uc?export=download&id=${data[file].id}"><i class="fa-solid fa-download fa-lg "></i></td>
    </tr>`
    }
}





// MENU HAMBURGER

function toggleMobileMenu(menu) {
    menu.classList.toggle('open');
}