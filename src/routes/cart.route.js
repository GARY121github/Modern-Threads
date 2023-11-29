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
    res.send('ok');
})

router.delete('/:id/delete', async (req, res) => {
    console.log(req.params.id);
    const { id : productId } = req.params;
    const userId = res.locals.user._id;
    const user = await User.findById(userId);
    const product = user.cart.find(product => product.productId == productId);
    if (product) {
        user.cart = user.cart.filter(product => product.productId != productId);
    }
    await user.save();
    res.redirect('/cart');
})



export default router;