require('dotenv').config();
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const multer = require('multer');
const bcrypt = require('bcrypt');  //external library for hashing passwords

const upload = multer({ storage: multer.memoryStorage() }); 

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
app.post('/create', upload.single('image_file'), async (req, res) => {
  const { name, price, quantity } = req.body;
  //store the image as a buffer in the DB:
  const image_file = req.file ? req.file.buffer : null;

  try {
    const results = await pool.query(
      'INSERT INTO items VALUES (DEFAULT, $1, $2, $3, $4)',
      [name, price, quantity, image_file]
    );
    console.log(results.rowCount);
    if (results.rowCount === 1) {
      res.send({ message: 'Item created successfully', item: { name, price, quantity, image_file } });
    } else {
      res.status(400).send({ message: 'Error creating item' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

//get image by id
app.get('/image/:id', async (req, res) => {
  try {
    const results = await pool.query('SELECT image_file FROM items WHERE id = $1', [req.params.id]);
    if (results.rows.length && results.rows[0].image_file) {
      res.set('Content-Type', 'image/jpeg'); 
      res.send(results.rows[0].image_file);
    } else {
      res.status(404).send('Image not found');
    }
  } catch (err) {
    res.status(500).send('Server error');
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
app.delete('/delete', async (req, res) => {
  const { id } = req.body;
  const results = await pool.query('DELETE FROM items WHERE id = $1;', [id]);
  console.log(results.rowCount);
  if (results.rowCount === 1) {
    console.log('Item deleted successfully');
    res.send({ message: 'Item deleted successfully' });
  } else {
    res.status(400).send({ message: 'Error deleting item or item not found' });
  }
});


// Login route using users table
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Look up user by email
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }
    const user = result.rows[0];

    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email, id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.send({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if user exists
    const exists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (exists.rows.length > 0) {
      return res.status(400).send({ message: 'User already exists' });
    }
    // Hash password
    const hashed = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hashed]);
    res.send({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
})