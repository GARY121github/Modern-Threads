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

            if (productRating.classList.contains('active')) {
                ratingAndReviewSection.style.display = 'block';
                productDetailsSection.style.display = 'none';
                faqSection.style.display = 'none';
            }
            else if (productDetails.classList.contains('active')) {
                productDetailsSection.style.display = 'block';
                ratingAndReviewSection.style.display = 'none';
                faqSection.style.display = 'none';
            }
            else if (productFAQ.classList.contains('active')) {
                faqSection.style.display = 'block';
                ratingAndReviewSection.style.display = 'none';
                productDetailsSection.style.display = 'none';
            }

        });
    });
});

// Get all elements with the class 'size-button'
const sizeButtons = document.querySelectorAll('.size-button');

// Add click event listeners to each button
sizeButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Reset the background color of all buttons to the default
        sizeButtons.forEach(b => {
            b.style.backgroundColor = '#F0F0F0';
            b.style.color = '#000000';
        });

        // Set the background color of the clicked button to a different color (e.g., black)
        button.style.backgroundColor = '#000000';
        button.style.color = '#FFFFFF';
    });
});

//  AXIOS REQUEST TO ADD PRODUCT IN CART

const addToCartBtn = document.querySelector('#add-to-cart');
const numberOfItems = document.querySelector('#number-of-items');

const addToCart = async (data) => {
    const productId = window.location.pathname.split('/')[2];
    try {
        // Send a POST request
        const res = await axios({
            method: 'post',
            url: `/cart/add`,
            data: {
                quantity: parseInt(data.numberOfItems),
                productId: productId
            }
        });
        window.location.href = "/cart";

    } catch (error) {
        console.error("Error adding data to cart:", error);
    }
}

addToCartBtn.addEventListener('click', () => {
    console.log("button clicked");
    addToCart({ numberOfItems: numberOfItems.innerHTML });
});


