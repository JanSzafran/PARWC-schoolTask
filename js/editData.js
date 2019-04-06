const putContainer = document.getElementById('putContainer');
const editItemBtn = document.getElementById('editItem');
const submitPutBtn = document.getElementById('submitPutBtn');
const cancelPutBtn = document.getElementById('cancelPutBtn');
let idToChange;
let nameToChange;
let isAvaliableToChange;
let changedItem;

function activatePutWindowWhenAddItemClicked() {
    mainContainer.style.opacity = "0.1";
    putContainer.classList.remove('putContainerHidden');
}

editItemBtn.addEventListener('click', activatePutWindowWhenAddItemClicked);

function hidePutWhenCancelBtnClicked() {
    mainContainer.style.opacity = "1";
    putContainer.classList.add('putContainerHidden');
}

cancelPutBtn.addEventListener('click', hidePutWhenCancelBtnClicked);

function getIdOfItemToEdit() {
    idToChange = document.getElementById('idToEdit').value;
    return idToChange;
}

function createNewNameForItem() {
    nameToChange = document.getElementById('nameToEdit').value;
    return nameToChange;
}

function changeInStockInfo() {
    isAvaliableToChange = document.getElementById('checkAvaliableToEdit').checked;
    return isAvaliableToChange;
}

function editCurrentItem() {
    getIdOfItemToEdit();
    createNewNameForItem();
    changeInStockInfo();
    editedItem = {
        id: idToChange,
        name: nameToChange,
        inStock: isAvaliableToChange
    }  
    putEditItem();
}

function putEditItem() {
    fetch(`http://localhost:64095/api/products/${idToChange}`, {
        method: 'put',
        headers:{'content-type': 'application/json'},
        body: JSON.stringify(editedItem)
    }).then(function(response) {
        if (!response.ok) {
            alert('Error! Couldnt edit the item');
        }
        alert('Item edited successfully!')
    })
}

submitPutBtn.addEventListener('click', editCurrentItem);