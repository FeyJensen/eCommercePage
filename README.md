# eCommerce Seller Page

## Overview
This app is designed for sellers who want to manage products on their website. You can create new listings, upload product images, set pricing, keep track of inventory, and delete listings as needed. The interface is styled with a modern, boho-corporate theme for a warm and professional look.

## Features
- Add new product listings with name, price, quantity, and image
- Drag and drop image upload with preview
- View all current listings in a responsive card grid
- Delete listings with a single click
- Inventory and pricing management
- Stylish, responsive UI using React Bootstrap and custom CSS

## Tech Stack
- **Frontend:** React, React Bootstrap, react-dropzone, custom CSS
- **Backend:** Node.js, Express, Multer (for file uploads)
- **Database:** PostgreSQL (images stored as `bytea`)

## Getting Started

### Prerequisites
- Node.js and npm
- PostgreSQL

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/ecommerce-seller-page.git
   cd ecommerce-seller-page
   ```

2. **Install dependencies:**
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```

3. **Set up your PostgreSQL database:**
   - Create a database and a table named `items` with columns for id, name, price, quantity, and image_file (`bytea`).

   Example table schema:
   ```sql
   CREATE TABLE items (
     id SERIAL PRIMARY KEY,
     name TEXT,
     price NUMERIC,
     quantity INTEGER,
     image_file BYTEA
   );
   ```

4. **Configure environment variables:**
   - Create a `.env` file in the `server` directory with your database connection string.

5. **Start the backend server:**
   ```bash
   cd server
   node app.js
   ```

6. **Start the frontend:**
   ```bash
   cd ../client
   npm start
   ```

7. **Visit the app:**
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- Use the "+Add a Listing" form to add new products.
- Drag and drop or click to upload an image.
- View all listings in the "All Listings" section.
- Click "DELETE" to remove a listing.

## Project Management

Track progress and tasks on the [Trello Board](https://trello.com/b/M2WDHkXa/ecommerce).


## Screenshots

_Add screenshots here if desired._

## License

MIT

---
**Made with ❤️ for sellers and small businesses.**