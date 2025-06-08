require('dotenv').config();
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(express.json());

//get all item listings
app.get('/all', async(req, res) => {
  const results = await pool.query('SELECT * FROM items');
  console.log(results.rows);

  if (results.rows.length === 0) {
    return res.status(400).send({ message: 'No items found' });
  }
  if(results) {
  res.send({ 'results': results.rows });
  }
  else {
    res.status(400).send({ message: 'Not Found'});
  }
});

// get specific listing by name
app.get('/name', async(req, res) => {
  const results = await pool.query('SELECT * FROM items WHERE name = $1', [req.body.name]);
  console.log(results.rows);
  if (results.rows.length === 0) {
    return res.status(400).send({ message: 'Item not found' });
  }
  if (results) {
  res.send({ 'results': results.rows });
  }
  else {
    res.status(400).send({ message: 'Not Found' });
  }
  
});

//create listing
app.post('/create', async(req, res) => {
  const results = await pool.query('INSERT INTO items VALUES (DEFAULT, $1, $2, $3)', [req.body.name, req.body.price, req.body.quantity]);
  console.log(results.rowCount);
  if(results.rowCount === 1){
  res.send({ message: 'Item created successfully', item: req.body });
  }
  else {
    res.status(400).send({ message: 'Error creating item' });
  }
});

//update listing quantity by name
app.put('/update', async(req, res) => {
  const results = await pool.query('UPDATE items SET quantity = $1 WHERE name = $2;', [req.body.quantity, req.body.name]);
  console.log(results.rowCount);
  if (results.rowCount === 0) {
    return res.status(400).send({ message: 'Item not found or no changes made' });
  }
  if (results.rowCount === 1) {
    res.send({ message: 'Item updated successfully', item: req.body });
  }
  else {
    res.status(400).send({ message: 'Error updating item' });
  }
})

//delete listing
app.delete('/delete', async(req, res) => {
  const results = await pool.query('DELETE FROM items WHERE name = $1;', [req.body.name]);
  console.log(results.rowCount);
  if (results.rowCount === 1) {
    console.log('Item deleted successfully');
    res.send({ message: 'Item deleted successfully' });
  } else {
    res.status(400).send({ message: 'Error deleting item or item not found' });
  }
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
})