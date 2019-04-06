const mainContainer = document.getElementById('mainContainer');
const removeBtn = document.getElementById('removeBtn');
const addItemBtn = document.getElementById('addItem');
const postContainer = document.getElementById('postContainer');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
let idToDelete;
let nameToAdd;
let isAvaliable;
let newItem;

function activatePostWindowWhenAddItemClicked() {
    mainContainer.style.opacity = "0.1";
}

function deleteItemOnClick() {
    idToDelete = document.getElementById('idRemove').value;
    deleteElementWithSpecifiedId();
}

function deleteElementWithSpecifiedId() {
    fetch(`http://localhost:64095/api/products/${idToDelete}`, {
        method: 'DELETE'
    }).then(function(response) {
        if (!response.ok) {
            alert('Id not found');
        }
        alert('Item deleted successfully!')
    })
}

removeBtn.addEventListener('click', deleteItemOnClick);

function activateFormWhenAddItemBtnClicked() {
    mainContainer.style.opacity = "0.1";
    postContainer.classList.remove('postContainerHidden');
}

function hideFormWhenCancelBtnClicked() {
    mainContainer.style.opacity = "1";
    postContainer.classList.add('postContainerHidden');
}

function getValueFromNameInput() {
    nameToAdd = document.getElementById('nameToAdd').value;
    return nameToAdd;
}

function getValueFromCheckAvaliable() {
    isAvaliable = document.getElementById('checkAvaliable').checked;
    return isAvaliable;
}

function createNewItem() {
    getValueFromNameInput();
    getValueFromCheckAvaliable();
    newItem = {
        name: nameToAdd,
        inStock: isAvaliable
    }  
    sendItem();
}

function sendItem() {
    fetch(`http://localhost:64095/api/products`, {
        method: 'post',
        headers:{'content-type': 'application/json'},
        body: JSON.stringify(newItem)
    }).then(function(response) {
        if (!response.ok) {
            alert('Error! Couldnt add the item');
        }
        alert('Item added successfully!')
    })
}

addItemBtn.addEventListener('click', activateFormWhenAddItemBtnClicked);
submitBtn.addEventListener('click', createNewItem);
cancelBtn.addEventListener('click', hideFormWhenCancelBtnClicked);

