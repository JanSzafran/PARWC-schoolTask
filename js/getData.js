let dataTable = document.getElementById('dataTable');
const loadAll = document.getElementById('loadAll');
const findByIdBtn = document.getElementById('findById');
const clearTableBtn = document.getElementById('clear');
let id;

function clearTableOnClick() {
    dataTable.innerHTML = "";
}

clearTableBtn.addEventListener('click', clearTableOnClick);

function insertDataIntoTable(element) {
    const row = document.createElement('TR');
    const idCell = document.createElement('TD');
    idCell.classList.add('idCell');
    idCell.innerHTML = element.id;
    const stockCell = document.createElement('TD');
    stockCell.classList.add('stockCell');
    stockCell.innerHTML = element.inStock;
    const nameCell = document.createElement('TD');
    nameCell.classList.add('nameCell');
    nameCell.innerHTML = element.name;
    row.appendChild(idCell);
    row.appendChild(stockCell);
    row.appendChild(nameCell);
    dataTable.appendChild(row);
}

function getAllElements() {
    fetch("http://localhost:64095/api/products")
    .then(response => response.json())
    .then(data => {
        data.forEach(element => {
            insertDataIntoTable(element);
            })
        }
    )
}

loadAll.addEventListener('click', getAllElements);

function getValueFromInput() {
    dataTable.innerHTML = "";
    id = document.getElementById('idValue').value;
    getElementWithSpecifiedId();
}

function getElementWithSpecifiedId() {
    fetch(`http://localhost:64095/api/products/${id}`)
    .then(function(response) {
        if (!response.ok) {
            alert('Id not found');
        }
        return response.json()
    })
    .then(data => {
        insertDataIntoTable(data);
    })
}

findByIdBtn.addEventListener('click', getValueFromInput);



