import { Router } from "express";

import Stripe from 'stripe';
const Publish_Key = process.env.STRIPE_PUBLISHABLE_KEY;
const Secret_Key = process.env.STRIPE_SECRET_KEY;

const stripe = new Stripe(Secret_Key);
const router = Router();

router.post('/stripe', function (req, res) {

    console.log("req made");

    // Moreover you can take more details from user
    // like Address, Name, etc from form
    stripe.customers.create({
        email: 'harshprakash000@gmail.com',
        source: 123456789,
        name: 'Harsh',
        address: {
            line1: 'TC 9/4 Old MES colony',
            postal_code: '452331',
            city: 'Indore',
            state: 'Madhya Pradesh',
            country: 'India',
        }
    })
        .then((customer) => {

            return stripe.charges.create({
                amount: 2500,     // Charging Rs 25
                description: 'Web Development Product',
                currency: 'INR',
                customer: 2222222222222222
            });
        })
        .then((charge) => {
            console.log("PAYMENT SUCCESSFULL")
            res.send("Success")  // If no error occurs
        })
        .catch((err) => {
            res.send(err)       // If some error occurs
        });
})





export default router;