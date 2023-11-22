import express from 'express';
import { Product } from '../models/index.js';
import { upload } from '../middlewares/index.js';
import { uploadImage } from '../utils/cloudinary.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const allProducts = await Product.find({});
    res.render('products/allProducts', { Products: allProducts });
})

router.get('/create', async (req, res) => {
    res.render('products/createProduct');
})

router.post('/create', upload.single('image'), async (req, res) => {

    // upload the image to cloudinary
    const image = await uploadImage(req.file.path);

    const { name, description, price, stock } = req.body;
    await Product.create({ name, description, price, image, stock });

    res.redirect('/');
});

router.get('/product/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('reviews');
    
    res.render('products/showProduct', { product });
})

// edit route 
// router.get('/product/:id/edit', async(req,res)=>{
//     const {id} = req.params;
//     let foundproduct = await Product.findById(id);
//     res.render('products/editProduct',{foundproduct});
// })

router.patch('/product/:id', async(req,res)=>{
    let {id} = req.params ;
    let { name,  description ,  price,  image,  stock,  manufacturer,category} = req.body;
    await Product.findByIdAndUpdate(id,{name,  description ,  price,  image,  stock,  manufacturer,category})
    res.redirect(`/product/${id}`);
})

// delete route 
router.delete('/product/:id/delete', async (req,res)=>{
    let {id} = req.params ;
    const {product} = Product.findById(id);
    await Product.findByIdAndDelete(id);
    res.redirect('/');
})  


export default router;