import { Router } from 'express'
import { Review, Product } from '../models/index.js';
import { authenticate } from '../middlewares/index.js';
const router = new Router();

router.post('/product/:id/review', authenticate, async (req, res) => {
    const { id } = req.params;

    let { rating, comment } = req.body;
    rating = parseInt(rating);

    const user = res.locals.user._id;

    const review = await Review.create({ rating, comment, user });
    const product = await Product.findById(id);

    product.reviews.push(review);
    product.save();

    console.log("review added successfully");

    res.redirect(`/product/${id}`);
});

router.delete('/product/:id/review/:reviewId', authenticate, async (req, res) => {
    const { id, reviewId } = req.params;
    const product = await Product.findById(id);

    // Use filter to create a new array without the review to be deleted
    product.reviews = product.reviews.filter(review => review._id != reviewId);

    // Save the updated reviews array
    await product.save();

    // Delete the review from the Review model
    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
        console.log("Review not found");
        return res.status(404).send("Review not found");
    }

    console.log("Review deleted successfully");
    res.redirect(`/product/${id}`);

});



export default router;