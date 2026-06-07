import { Product, Cart, Order } from '../models/index.js';

// Product Controllers
export const getAllProducts = async (req, res) => {
  try {
    const { limit = 20, offset = 0 } = req.query;
    const products = await Product.findAll(parseInt(limit), parseInt(offset));
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { limit = 20, offset = 0 } = req.query;
    const products = await Product.findByCategory(category, parseInt(limit), parseInt(offset));
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.findFeatured();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNewArrivals = async (req, res) => {
  try {
    const products = await Product.findNewArrivals();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: 'Search query required' });
    }
    const products = await Product.search(q);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cart Controllers
export const getCart = async (req, res) => {
  try {
    const cartItems = await Cart.findByUserId(req.userId);
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity, size, color } = req.body;
    const cartItem = await Cart.addItem(req.userId, productId, quantity, size, color);
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cartItem = await Cart.updateItem(req.params.id, quantity);
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    await Cart.removeItem(req.params.id);
    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    await Cart.clearCart(req.userId);
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Order Controllers
export const createOrder = async (req, res) => {
  try {
    const { shippingAddress } = req.body;
    const cartItems = await Cart.findByUserId(req.userId);

    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderNumber = `ORD-${Date.now()}`;

    const order = await Order.create(req.userId, orderNumber, totalAmount, shippingAddress);

    // Add order items
    for (const item of cartItems) {
      const pool = (await import('../database/connection.js')).default;
      await pool.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price, size, color)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [order.id, item.product_id, item.quantity, item.price, item.size, item.color]
      );
    }

    // Clear cart
    await Cart.clearCart(req.userId);

    res.status(201).json({
      message: 'Order created successfully',
      order: {
        id: order.id,
        orderNumber: order.order_number,
        totalAmount: order.total_amount,
        status: order.status
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const { limit = 20, offset = 0 } = req.query;
    const orders = await Order.findByUserId(req.userId, parseInt(limit), parseInt(offset));
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    // Check if order belongs to user
    if (order.user_id !== req.userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
