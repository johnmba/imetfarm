
const msg = document.getElementById("contact-form")
const success = document.querySelector("#contact-form .sent-message")
msg.addEventListener("submit", (event) =>{
    event.preventDefault();
    success.classList.remove("d-none")
})