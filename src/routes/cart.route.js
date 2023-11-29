import { Router } from 'express';
import { User } from '../models/index.js';
const router = Router();

router.get('/', async (req, res) => {
    const userId = res.locals.user._id;
    const user = await User.findById(userId).populate('cart.productId');
    const cart = user.cart;
    const totalPrice = cart.reduce((acc, item) => {
        return acc + item.productId.price * item.quantity;
    }, 0);
    res.render('cart/userCart', { cart, total: totalPrice });
})

router.post('/add', async (req, res) => {
    const { quantity, productId } = req.body;
    const userId = res.locals.user._id;
    const user = await User.findById(userId);
    const product = user.cart.find(product => product.productId == productId);
    if (product) {
        product.quantity += quantity;
    } else {
        user.cart.push({ productId, quantity });
    }
    await user.save();
    res.status(200).send({ message: 'ok' });
})

router.post('/:productId/increase', async (req, res) => {
    const { productId } = req.params;
    const userId = res.locals.user._id;
    const user = await User.findById(userId);
    const product = user.cart.find(product => product.productId == productId);
    if (product) {
        product.quantity += 1;
    }
    await user.save();
    res.redirect('/cart');
})

router.post('/:productId/decrease', async (req, res) => {
    const { productId } = req.params;
    const userId = res.locals.user._id;
    const user = await User.findById(userId);
    const product = user.cart.find(product => product.productId == productId);
    if (product) {
        product.quantity -= 1;
    }
    await user.save();
    res.redirect('/cart');
})

router.delete('/:id/delete', async (req, res) => {
    const { id: productId } = req.params;
    const userId = res.locals.user._id;
    const user = await User.findById(userId);
    const product = user.cart.find(product => product.productId == productId);
    if (product) {
        user.cart = user.cart.filter(product => product.productId != productId);
    }
    await user.save();
    res.redirect('/cart');
})


router.get('/clear-cart', async (req, res) => {
    const { id: productId } = req.params;
    const userId = res.locals.user._id;
    const user = await User.findById(userId);
    user.cart = [];
    await user.save();
    res.redirect('/');
})


export default router;