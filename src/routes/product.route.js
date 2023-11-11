import express from 'express';
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('products/allProducts');
})

export default router;