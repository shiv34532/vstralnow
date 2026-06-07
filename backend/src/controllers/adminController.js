import pool from '../database/connection.js';

export const getAdminOverview = async (req, res) => {
  try {
    const [{ rows: productRows }, { rows: orderRows }, { rows: userRows }] = await Promise.all([
      pool.query('SELECT COUNT(*) AS count FROM products'),
      pool.query('SELECT COUNT(*) AS count FROM orders'),
      pool.query('SELECT COUNT(*) AS count FROM users')
    ]);

    res.json({
      products: parseInt(productRows[0]?.count || '0', 10),
      orders: parseInt(orderRows[0]?.count || '0', 10),
      users: parseInt(userRows[0]?.count || '0', 10)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
