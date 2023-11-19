const number = document.querySelector('#number-of-items');
const add = document.querySelector('#add');
const sub = document.querySelector('#sub');

console.log(number);
add.addEventListener('click', () => {
    number.innerText = parseInt(number.innerText) + 1;
});

sub.addEventListener('click', () => {
    if (parseInt(number.innerText) > 1) {
        number.innerText = parseInt(number.innerText) - 1;
    }
})

