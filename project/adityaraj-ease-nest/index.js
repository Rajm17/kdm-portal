const maxformsubmit = 2;
let formsubmitcount = 0;

function loaded() {
  document.getElementById('contact-form').addEventListener("submit", handleFormSubmit);
  document.getElementById('popup-contact-form').addEventListener("submit", handlePopupForm);
  document.getElementById('popup-phone').addEventListener('change', phoneNumberValidation);
  document.getElementById('phone').addEventListener('change', phoneNumberValidation);
};

document.addEventListener("DOMContentLoaded", loaded, false);

let popupTimeout = setTimeout(openPopupForm, 20000);

// Handlers move-to-top and whatsapp chat function
window.addEventListener('scroll', function () {
  const scrollY = window.scrollY; // Get current scroll position
  const moveTopBtn = document.getElementById('move-top');
  const whatsappRedirectBtn = document.getElementById('whatsapp-redirect');
  const threshold = 100;

  if (scrollY > threshold) {
    moveTopBtn.classList.add('visible');
    whatsappRedirectBtn.classList.add('visible');
  } else {
    moveTopBtn.classList.remove('visible');
    whatsappRedirectBtn.classList.remove('visible');
  }
});


// Handles Poppers
const popperElements = document.querySelectorAll(".poppers");

for (const popperElement of popperElements) {
  popperElement.addEventListener("click", openPopupForm);
}

function openPopupForm() {
  document.getElementById(
    "popup-form-container"
  ).style.display = "block";
  document.getElementById(
    "popup-overlay"
  ).style.display = "block";
}

function closePopupForm() {
  document.getElementById(
    "popup-contact-form"
  ).reset();
  document.getElementById(
    "popup-form-container"
  ).style.display = "none";
  document.getElementById(
    "popup-overlay"
  ).style.display = "none";
}

function getFormData(form) {
  var elements = form.elements;
  var honeypot;
  var formData = {};
  formData.full_name = elements.full_name.value;
  formData.email = elements.email.value;
  formData.phoneNumber = elements.phone_number.value;
  formData.honeypot = elements._protect.checked;
  return { data: formData, honeypot: honeypot };
}

function handleFormSubmit(event) {
  event.preventDefault();
  clearTimeout(popupTimeout);
  var form = event.target;
  var formData = getFormData(form);
  let timeout = 2000;

  if (formsubmitcount < maxformsubmit && !formData.honeypot) {

    var data = formData.data;

    pauseButtonDuringRequest(form, true);
    var url = "https://script.google.com/macros/s/AKfycbxZ5DYeLuluXUHgPOJeg-HTXsxNI9HKkA4ZnXrol8P78VP17IasbljY_0VyS9QmwjlBOA/exec";
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var thankYouMessage = form.querySelector(".thankyou_message");
        if (thankYouMessage) {
          thankYouMessage.style.display = "block";
        }
      } 
    };
    var encoded = Object.keys(data).map(function (k) {
      return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
    }).join('&');

    try {
      xhr.send(encoded);
      formsubmitcount++;
    } catch (error) {
    }
    pauseButtonDuringRequest(form, false);
  } else {
    document.getElementById('thankyou_msg_div').innerHTML = "You have exceeded form submission limit! Please Contact us on mentioned Whatsapp number, to get details about project."
    timeout = 5000;
  }
  form.reset();
  document.getElementById('thankyou_msg_div').style.display = "block";
  setTimeout(closeThankyouPopup, timeout);
}


function closeThankyouPopup() {
  document.getElementById('thankyou_msg_div').style.display = "none";
}

function handlePopupForm(event) {
  var result = handleFormSubmit(event);
  if (result == null)
    closePopupForm();
}

function phoneNumberValidation(ev) {
  const input = ev.target;
  const indianPhoneRegex = /^[6-789]\d{9}|\+91[6-789]\d{9}|0[6-789]\d{9}|\+91 [6-789]\d{9}$/;
  if (!indianPhoneRegex.test(input.value)) {
    input.setCustomValidity("Invalid phone number. Please enter valid 10-digit number");
  } else {
    input.setCustomValidity("");
  }
}

function pauseButtonDuringRequest(form, isPause) {
  var buttons = form.querySelectorAll("button");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].disabled = isPause;
  }
}