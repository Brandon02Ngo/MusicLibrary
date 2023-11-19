// change username pop-up
const open_edit_username_modal_btn = document.getElementById("open_edit_username_modal_btn");
const modal_container_id = document.getElementById("modal_container_id");
const close_edit_username_modal_btn = document.getElementById("close_edit_username_modal_btn");

open_edit_username_modal_btn.addEventListener("click", () => {
    modal_container_id.classList.add("show");
});

close_edit_username_modal_btn.addEventListener("click", () => {
    modal_container_id.classList.remove("show");
});


// change email pop-up
const open_edit_email_modal_btn = document.getElementById("open_edit_email_modal_btn");
const modal_container_id_email = document.getElementById("modal_container_id_email");
const close_edit_email_modal_btn = document.getElementById("close_edit_email_modal_btn");

open_edit_email_modal_btn.addEventListener("click", () => {
    modal_container_id_email.classList.add("show");
});

close_edit_email_modal_btn.addEventListener("click", () => {
    modal_container_id_email.classList.remove("show");
});


// change password pop-up
const open_edit_password_modal_btn = document.getElementById("open_edit_password_modal_btn");
const modal_container_id_password = document.getElementById("modal_container_id_password");
const close_edit_password_modal_btn = document.getElementById("close_edit_password_modal_btn");

open_edit_password_modal_btn.addEventListener("click", () => {
    modal_container_id_password.classList.add("show");
});

close_edit_password_modal_btn.addEventListener("click", () => {
    modal_container_id_password.classList.remove("show");
});


// contact us pop-up
const open_contact_us_modal_btn = document.getElementById("open_contact_us_modal_btn");
const modal_container_id_contact_us = document.getElementById("modal_container_id_contact_us");
const close_contact_us_modal_btn = document.getElementById("close_contact_us_modal_btn");

open_contact_us_modal_btn.addEventListener("click", () => {
    modal_container_id_contact_us.classList.add("show");
});

close_contact_us_modal_btn.addEventListener("click", () => {
    modal_container_id_contact_us.classList.remove("show");
});

const urlParams = new URLSearchParams(window.location.search);
const audioDataString = urlParams.get('audioData');

const binaryAudioData = atob(audioDataString);

const audioElement = document.createElement('audio');
audioElement.src = `data:audio/mpeg;base64,${btoa(binaryAudioData)}`;
document.body.appendChild(audioElement); // Append the audio element to the body or another container

audioElement.play();
