import express from 'express';
import { Product } from '../models/index.js';
import { upload, authenticate } from '../middlewares/index.js';
import { uploadImage } from '../utils/cloudinary.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const allProducts = await Product.find({});
    res.render('products/allProducts', { Products: allProducts });
})

router.get('/create', authenticate, async (req, res) => {
    // console.log(req.app.locals.user);
    res.render('products/createProduct');
})

router.post('/create', authenticate, upload.single('image'), async (req, res) => {

    // upload the image to cloudinary
    const image = await uploadImage(req.file.path);
    const { name, description, price, stock } = req.body;
    const manufacturer = res.locals.user._id;

    await Product.create({ name, description, price, image, stock, manufacturer });

    res.redirect('/');
});

router.get('/product/:id', authenticate, async (req, res) => {

    const { id } = req.params;
    const product = await Product.findById(id).populate('reviews');
    res.render('products/showProduct', { product });
})


export default router;