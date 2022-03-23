// Dom Contact Elements
const modalContainer = document.querySelector('modal');
const modal = document.getElementById("contact_modal");
const firstname = document.getElementById('firstname')
const lastname = document.getElementById('lastname')
const mail = document.getElementById('mail')
const message = document.getElementById('message')


window.addEventListener('keydown', function (event) {
    if (event.key == 'Escape') {
        closeModal();
    }
})

function displayModal() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

function log(event) {
    event.preventDefault();
    console.log(firstname.value);
    console.log(lastname.value);
    console.log(mail.value);
    console.log(message.value);
    closeModal();
}

