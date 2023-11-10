const menuToggle = document.getElementById('menu-toggle');
const navBar = document.querySelector('.nav-bar');

menuToggle.addEventListener('click', () => {
    navBar.classList.toggle('active');
});
