// Cart logic for eCommercePage
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Add item to cart
router.post('/cart/add', async (req, res) => {
  const { name, quantity, price, cartTotal } = req.body;
  try {
    // Fetch id and image_file from items table by name
    const itemResult = await pool.query('SELECT id, image_file FROM items WHERE name = $1', [name]);
    const item_id = itemResult.rows.length > 0 ? itemResult.rows[0].id : null;
    const image_file = itemResult.rows.length > 0 ? itemResult.rows[0].image_file : null;
    const result = await pool.query(
      'INSERT INTO cart (item_id, name, image_file, quantity, price, cartTotal) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [item_id, name, image_file, quantity, price, cartTotal]
    );
    res.send({ message: 'Added to cart', cartItem: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error adding to cart' });
  }
});

// Get all cart items
router.get('/cart', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cart');
    res.send({ cart: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error fetching cart' });
  }
});

// Remove item from cart
router.delete('/cart/remove', async (req, res) => {
  const { id } = req.body;
  try {
    const result = await pool.query('DELETE FROM cart WHERE item_id = $1', [id]);
    if (result.rowCount === 1) {
      res.send({ message: 'Item removed from cart' });
    } else {
      res.status(400).send({ message: 'Item not found in cart' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error removing from cart' });
  }
});

module.exports = router;
