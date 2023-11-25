import express from 'express';
import { Product } from '../models/index.js';
import { upload, authenticate, setGlobalVariable } from '../middlewares/index.js';
import { uploadImage } from '../utils/cloudinary.js';

const router = express.Router();

router.get('/', setGlobalVariable, async (req, res) => {

    const allProducts = await Product.find({});
    res.render('products/allProducts', { Products: allProducts });
})

router.get('/create', setGlobalVariable, async (req, res) => {
    res.render('products/createProduct');
})

router.post('/create', authenticate, setGlobalVariable, upload.single('image'), async (req, res) => {

    // upload the image to cloudinary
    const image = await uploadImage(req.file.path);

    const { name, description, price, stock } = req.body;
    await Product.create({ name, description, price, image, stock });

    res.redirect('/');
});

router.get('/product/:id', authenticate, setGlobalVariable, async (req, res) => {
    // console.log(req.session.user);
    const { id } = req.params;
    const product = await Product.findById(id).populate('reviews');

    res.render('products/showProduct', { product });
})


export default router;