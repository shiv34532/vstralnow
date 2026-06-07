import pool from '../database/connection.js';

// Users Model
export const User = {
  async findById(id) {
    const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return res.rows[0];
  },

  async findByEmail(email) {
    const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return res.rows[0];
  },

  async create(email, passwordHash, firstName, lastName, phone, role = 'customer') {
    const res = await pool.query(
      'INSERT INTO users (email, password_hash, first_name, last_name, phone, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [email, passwordHash, firstName, lastName, phone, role]
    );
    return res.rows[0];
  },

  async update(id, updates) {
    const fields = [];
    const values = [];
    let paramCount = 1;
    
    for (const [key, value] of Object.entries(updates)) {
      fields.push(`${key} = $${paramCount}`);
      values.push(value);
      paramCount++;
    }
    
    values.push(id);
    const res = await pool.query(
      `UPDATE users SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = $${paramCount} RETURNING *`,
      values
    );
    return res.rows[0];
  }
};

// Products Model
export const Product = {
  async findAll(limit = 20, offset = 0) {
    const res = await pool.query(
      'SELECT id, name, category, price, image_url AS image, material, description, featured, new_arrival AS "newArrival", stock_quantity AS stock, original_price AS "originalPrice" FROM products LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    return res.rows;
  },

  async findById(id) {
    const baseRes = await pool.query(
      'SELECT id, name, category, price, image_url AS image, material, description, featured, new_arrival AS "newArrival", stock_quantity AS stock, original_price AS "originalPrice" FROM products WHERE id = $1',
      [id]
    );
    const product = baseRes.rows[0];
    if (!product) {
      return null;
    }

    const sizesRes = await pool.query(
      'SELECT size FROM product_sizes WHERE product_id = $1 AND available = true ORDER BY created_at',
      [id]
    );
    const colorsRes = await pool.query(
      'SELECT color_name FROM product_colors WHERE product_id = $1 AND available = true ORDER BY created_at',
      [id]
    );
    const imagesRes = await pool.query(
      'SELECT image_url FROM product_images WHERE product_id = $1 ORDER BY display_order, created_at',
      [id]
    );

    return {
      ...product,
      sizes: sizesRes.rows.map(row => row.size),
      colors: colorsRes.rows.map(row => row.color_name),
      images: imagesRes.rows.length > 0 ? imagesRes.rows.map(row => row.image_url) : [product.image]
    };
  },

  async findByCategory(category, limit = 20, offset = 0) {
    const normalizedCategory = category.toLowerCase();
    const res = await pool.query(
      `SELECT id, name, category, price, image_url AS image, material, description, featured, new_arrival AS "newArrival", stock_quantity AS stock, original_price AS "originalPrice"
       FROM products
       WHERE lower(replace(replace(category, '''', ''), ' ', '-')) = $1
       LIMIT $2 OFFSET $3`,
      [normalizedCategory, limit, offset]
    );
    return res.rows;
  },

  async findFeatured() {
    const res = await pool.query(
      'SELECT id, name, category, price, image_url AS image, material, description, featured, new_arrival AS "newArrival", stock_quantity AS stock, original_price AS "originalPrice" FROM products WHERE featured = true LIMIT 10'
    );
    return res.rows;
  },

  async findNewArrivals() {
    const res = await pool.query(
      'SELECT id, name, category, price, image_url AS image, material, description, featured, new_arrival AS "newArrival", stock_quantity AS stock, original_price AS "originalPrice" FROM products WHERE new_arrival = true LIMIT 10'
    );
    return res.rows;
  },

  async search(query) {
    const searchQuery = `%${query}%`;
    const res = await pool.query(
      'SELECT id, name, category, price, image_url AS image, material, description, featured, new_arrival AS "newArrival", stock_quantity AS stock, original_price AS "originalPrice" FROM products WHERE name ILIKE $1 OR description ILIKE $1 OR category ILIKE $1',
      [searchQuery]
    );
    return res.rows;
  },

  async create(data) {
    const res = await pool.query(
      'INSERT INTO products (name, description, category, price, original_price, image_url, stock_quantity, material, featured, new_arrival) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [data.name, data.description, data.category, data.price, data.originalPrice, data.imageUrl, data.stock, data.material, data.featured, data.newArrival]
    );
    return res.rows[0];
  }
};

// Cart Model
export const Cart = {
  async findByUserId(userId) {
    const res = await pool.query(
      `SELECT ci.*, p.name, p.price, p.image_url 
       FROM cart_items ci 
       JOIN products p ON ci.product_id = p.id 
       WHERE ci.user_id = $1`,
      [userId]
    );
    return res.rows;
  },

  async addItem(userId, productId, quantity, size, color) {
    const res = await pool.query(
      `INSERT INTO cart_items (user_id, product_id, quantity, size, color)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (user_id, product_id, size, color) DO UPDATE SET quantity = quantity + $3
       RETURNING *`,
      [userId, productId, quantity, size, color]
    );
    return res.rows[0];
  },

  async updateItem(id, quantity) {
    const res = await pool.query(
      'UPDATE cart_items SET quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [quantity, id]
    );
    return res.rows[0];
  },

  async removeItem(id) {
    await pool.query('DELETE FROM cart_items WHERE id = $1', [id]);
  },

  async clearCart(userId) {
    await pool.query('DELETE FROM cart_items WHERE user_id = $1', [userId]);
  }
};

// Orders Model
export const Order = {
  async create(userId, orderNumber, totalAmount, shippingAddress) {
    const res = await pool.query(
      `INSERT INTO orders (user_id, order_number, total_amount, shipping_address)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [userId, orderNumber, totalAmount, shippingAddress]
    );
    return res.rows[0];
  },

  async findById(id) {
    const res = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
    return res.rows[0];
  },

  async findByUserId(userId, limit = 20, offset = 0) {
    const res = await pool.query(
      'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
      [userId, limit, offset]
    );
    return res.rows;
  },

  async updateStatus(id, status) {
    const res = await pool.query(
      'UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, id]
    );
    return res.rows[0];
  }
};

// Reviews Model
export const Review = {
  async create(productId, userId, rating, reviewText) {
    const res = await pool.query(
      `INSERT INTO reviews (product_id, user_id, rating, review_text)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [productId, userId, rating, reviewText]
    );
    return res.rows[0];
  },

  async findByProductId(productId) {
    const res = await pool.query(
      `SELECT r.*, u.first_name, u.last_name 
       FROM reviews r 
       JOIN users u ON r.user_id = u.id 
       WHERE r.product_id = $1 
       ORDER BY r.created_at DESC`,
      [productId]
    );
    return res.rows;
  }
};
