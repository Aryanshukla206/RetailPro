import express from 'express';
import Cart from '../../models/Cart.js';

const router = express.Router();

// Get cart by ID
router.get('/:id', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id).populate('items.productId');
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create or update cart
router.post('/', async (req, res) => {
  const cart = new Cart(req.body);
  try {
    const newCart = await cart.save();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update cart status
router.patch('/:id/status', async (req, res) => {
  try {
    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;