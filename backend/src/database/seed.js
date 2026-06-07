import pool from './connection.js';
import bcrypt from 'bcryptjs';

const seedDatabase = async () => {
  const client = await pool.connect();

  try {
    console.log('🌱 Seeding database with sample data...');

    // Clear existing data
    await client.query('TRUNCATE TABLE wishlist, reviews, order_items, orders, cart_items, product_colors, product_sizes, product_images, products, users RESTART IDENTITY CASCADE');

    // Create sample users
    const hashedPassword = await bcrypt.hash('password123', 10);
    const userRes = await client.query(`
      INSERT INTO users (email, password_hash, first_name, last_name, phone, role)
      VALUES 
        ($1, $2, $3, $4, $5, $6),
        ($7, $8, $9, $10, $11, $12)
      RETURNING id, email;
    `, [
      'customer@vastra.com', hashedPassword, 'Raj', 'Kumar', '9876543210', 'customer',
      'admin@vastra.com', hashedPassword, 'Admin', 'User', '9999999999', 'admin'
    ]);
    console.log('✅ Sample users created');

    const userId = userRes.rows[0].id;

    // Create sample products
    const products = [
      {
        name: 'Premium Cotton Kurta',
        description: 'Traditional cotton kurta with embroidery details',
        category: 'Men\'s Traditional',
        price: 2499,
        originalPrice: 3999,
        imageUrl: 'https://images.unsplash.com/photo-1584832606876-cf59e6a92fd2?w=400',
        stock: 50,
        material: 'Cotton',
        featured: true
      },
      {
        name: 'Silk Saree with Zari Border',
        description: 'Elegant silk saree perfect for celebrations',
        category: 'Women\'s Traditional',
        price: 4999,
        originalPrice: 7999,
        imageUrl: 'https://images.unsplash.com/photo-1595777707802-91d177c547e8?w=400',
        stock: 30,
        material: 'Silk',
        featured: true
      },
      {
        name: 'Kids Ethnic Wear Set',
        description: 'Comfortable ethnic wear set for kids',
        category: 'Kids\' Traditional',
        price: 1299,
        originalPrice: 1999,
        imageUrl: 'https://images.unsplash.com/photo-1503919545889-48854d7ef890?w=400',
        stock: 40,
        material: 'Cotton Blend',
        newArrival: true
      },
      {
        name: 'Office Wear Blazer',
        description: 'Modern blazer for professional wear',
        category: 'Men\'s Office',
        price: 3499,
        originalPrice: 5499,
        imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400',
        stock: 25,
        material: 'Polyester Blend',
        featured: true
      },
      {
        name: 'Casual Palazzo Pants',
        description: 'Comfortable palazzo pants for casual outings',
        category: 'Women\'s Casual',
        price: 1899,
        originalPrice: 2999,
        imageUrl: 'https://images.unsplash.com/photo-1506629082632-4318c4c04e5d?w=400',
        stock: 35,
        material: 'Cotton',
        newArrival: true
      }
    ];

    for (const product of products) {
      const res = await client.query(`
        INSERT INTO products (name, description, category, price, original_price, image_url, stock_quantity, material, featured, new_arrival)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING id;
      `, [
        product.name, product.description, product.category, product.price,
        product.originalPrice, product.imageUrl, product.stock, product.material,
        product.featured || false, product.newArrival || false
      ]);

      const productId = res.rows[0].id;

      // Add sizes
      const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
      for (const size of sizes) {
        await client.query(`
          INSERT INTO product_sizes (product_id, size, available)
          VALUES ($1, $2, true);
        `, [productId, size]);
      }

      // Add colors
      const colors = [
        { name: 'Black', code: '#000000' },
        { name: 'White', code: '#FFFFFF' },
        { name: 'Navy', code: '#001F3F' },
        { name: 'Maroon', code: '#800000' }
      ];
      for (const color of colors) {
        await client.query(`
          INSERT INTO product_colors (product_id, color_name, color_code, available)
          VALUES ($1, $2, $3, true);
        `, [productId, color.name, color.code]);
      }
    }
    console.log('✅ Sample products created with sizes and colors');

    // Create sample cart item
    const productRes = await client.query('SELECT id FROM products LIMIT 1');
    const productId = productRes.rows[0].id;
    
    await client.query(`
      INSERT INTO cart_items (user_id, product_id, quantity, size, color)
      VALUES ($1, $2, 1, 'M', 'Black');
    `, [userId, productId]);
    console.log('✅ Sample cart items created');

    // Create sample order
    const orderRes = await client.query(`
      INSERT INTO orders (user_id, order_number, total_amount, status, payment_status)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id;
    `, [userId, 'ORD-' + Date.now(), 2499, 'pending', 'unpaid']);

    const orderId = orderRes.rows[0].id;

    // Add items to order
    await client.query(`
      INSERT INTO order_items (order_id, product_id, quantity, price, size, color)
      VALUES ($1, $2, $3, $4, $5, $6);
    `, [orderId, productId, 1, 2499, 'M', 'Black']);
    console.log('✅ Sample orders created');

    console.log('✨ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    client.release();
  }
};

seedDatabase().then(() => {
  console.log('Database seeded');
  process.exit(0);
}).catch((err) => {
  console.error('Failed to seed database:', err);
  process.exit(1);
});
