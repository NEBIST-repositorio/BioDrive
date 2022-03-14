/**
 * Description: 
 * This file manages the main content of the entire https://nebist-repositorio.github.io/BioDrive/
 * website
 *   
 * @author  Guilherme Soares, Ines Trincheiras.
 * @date    13/03/22     
 */

let jsData; // LEBIO repo information
const URL = "https://nebist-repositorio.github.io/BioDrive/script/data.json"

window.onload = () => {
    displayPage();
}

// Fetch json courses data and displays page 
async function displayPage() {
    jsData = await (await fetch(URL)).json();
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let path = urlParams.get('local');
    
    // if local parameter is set 
    if (path !== null) {
        createTable(path);
    }
}

// Changes page related to local parameter
function setLocal(local) {
    window.location.href = `../html/ano.html?local=${local}`;
}


// Creates table header with a given path
function createHeader(path, path_len) {
    const header = document.getElementById("header_ano");
    let jsData_copy = jsData;
    let sum_path = "";
    let value; 
    
    // Build path 
    for (let i = 0; i < path_len; i++) {
        value = path[i];
        sum_path += value; 
        jsData_copy = jsData_copy[value];

        if (value === "folder") {
            // first element has folder name 
            value = jsData_copy[0].name;
        }
        
        let value_parsed = parseInt(value);
        // Check if value is a number 
        if(! (Number.isInteger(value_parsed) && String(value_parsed) === value )){
            header.innerHTML += `<a onclick="setLocal('${sum_path}')">${value}</a><i class="fa-solid fa-angle-right fa-xs"></i>`;
        }
        sum_path += `/`;
    }
    // remove last arrow 
    header.removeChild(header.lastChild)  
    return jsData_copy;
}



// Global function to display Table
function createTable(path) {
    const path_split = path.split('/');
    const path_len = path_split.length;
    
    let jsData_copy = createHeader(path_split, path_len);
    
    Array.isArray(jsData_copy) ? displayFolder(jsData_copy, path) : displayMainFolders(jsData_copy, path)
}


// Adds main folders (generally this folders have short names and common throughout all Courses)
function displayMainFolders(data, path){
    let table_body = document.getElementById("cont_table");
    let new_path; 
    
    for (let i in data) {
        new_path = `${path}/${i}`;
        table_body.innerHTML += `<tr><td colspan="2"><a onclick="setLocal('${new_path}')">${i}</a></td></tr>`;
    }

}

// Adds folders that have longer names and could vary between courses 
function displayFolder(data, path){
    let table_body = document.getElementById("cont_table");
    
    for (let i in data) {
        if (data[i]["files"] !== undefined) {
            displayFiles(data[i]["files"]);
        } 
        else if(data[i]["folder"] !== undefined){
            // first element has folder name
            let name = data[i]["folder"][0].name;
            let new_path = `${path}/${i}/folder`;
            table_body.innerHTML += `<tr><td colspan="2"><a onclick="setLocal('${new_path}')">${name}</a></td></tr>`;
        }
    }
}

// Adds files to download
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