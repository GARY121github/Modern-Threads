import { Router } from 'express'
import { Review, Product } from '../models/index.js';
const router = new Router();

router.post('/product/:id/review', async (req, res) => {
    const { id } = req.params;

    let { rating, comment } = req.body;
    rating = parseInt(rating);

    const review = await Review.create({ rating, comment });
    const product = await Product.findById(id);

    product.reviews.push(review);
    product.save();

    res.redirect(`/product/${id}`);
});



export default router;