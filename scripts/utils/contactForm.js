// Dom Contact Elements
const modal = document.getElementById("contact_modal");
const form = document.getElementById('form');
const firstname = document.getElementById('firstname')
const lastname = document.getElementById('lastname')
const mail = document.getElementById('mail')
const message = document.getElementById('message')

function displayModal() {
	modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

function log(event){
    event.preventDefault();
    console.log(firstname.value);
    console.log(lastname.value);
    console.log(mail.value);
    console.log(message.value);
    closeModal();
}