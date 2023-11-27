import { Router } from 'express';
import { User } from '../models/index.js';
const router = Router();

router.post('/add', async (req, res) => {
    const { quantity, productId } = req.body;
    const userId = res.locals.user._id;
    const user = await User.findById(userId);
    console.log(user);
    const product = user.cart.find(product => product.productId == productId);
    if (product) {
        product.quantity += quantity;
    } else {
        user.cart.push({ productId, quantity });
    }
    await user.save();
    console.log(user)
    res.send('ok');
})

router.get('/', async (req, res) => {
    const userId = res.locals.user._id;
    const user = await User.findById(userId).populate('cart.productId');
    const cart = user.cart;
    const totalPrice = cart.reduce((acc, item) => {
        return acc + item.productId.price * item.quantity;
    }, 0);
    console.log(cart);
    res.render('cart/userCart', { cart, total: totalPrice });
})

export default router;