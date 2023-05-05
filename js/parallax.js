
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector ('.login-link');
const registerLink = document.querySelector ('.register-link');
const btnPopup = document.querySelector ('.btnLogin-popup');
const btnSignUpPopup = document.querySelector ('.btnSignUp-popup');
const iconClose = document.querySelector ('.icon-close');

registerLink.addEventListener('click', ()=> {wrapper.classList.add('active');});
loginLink.addEventListener('click', ()=> {wrapper.classList.remove('active');});
btnPopup.addEventListener('click', ()=> {wrapper.classList.add('active-popup');});
btnSignUpPopup.addEventListener('click', ()=> {wrapper.classList.add('active-popup');});
iconClose.addEventListener('click', ()=> {wrapper.classList.remove('active-popup');});


const parallax_el = document.querySelectorAll(".parallax");
let xValue = 0, yValue = 0;
window.addEventListener("mousemove", (e) => {
    xValue = e.clientX - window.innerWidth / 2;
    yValue = e.clientY - window.innerHeight / 2;

    parallax_el.forEach((el) => {
        let speedx = el.dataset.speedx;
        let speedy = el.dataset.speedy;
        el.style.transform =`translateX(calc(-50% + ${-xValue * speedx}px))
                             translateY(calc(-50% + ${-yValue * speedy}px))`;
    });
});
