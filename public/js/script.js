const number = document.querySelector('#number-of-items');
const add = document.querySelector('#add');
const sub = document.querySelector('#sub');


add.addEventListener('click', () => {
    number.innerText = parseInt(number.innerText) + 1;
});

sub.addEventListener('click', () => {
    if (parseInt(number.innerText) > 1) {
        number.innerText = parseInt(number.innerText) - 1;
    }
})



const productDetails = document.querySelector("#product-details");
const productRating = document.querySelector("#product-rating-and-review");
const productFAQ = document.querySelector("#product-faqs");


const productDetailsSection = document.querySelector('#product-details-section');
const ratingAndReviewSection = document.querySelector('#rating-and-review-section');
const faqSection = document.querySelector('#faqs-section');

// Add the 'active' class to the clicked link
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.about-product li');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');

            if(productRating.classList.contains('active')){
                ratingAndReviewSection.style.display = 'block';
                productDetailsSection.style.display = 'none';
                faqSection.style.display = 'none';
            }
            else if(productDetails.classList.contains('active')){
                productDetailsSection.style.display = 'block';
                ratingAndReviewSection.style.display = 'none';
                faqSection.style.display = 'none';
            }
            else if(productFAQ.classList.contains('active')){
                faqSection.style.display = 'block';
                ratingAndReviewSection.style.display = 'none';
                productDetailsSection.style.display = 'none';
            }
            
        });
    });
});


