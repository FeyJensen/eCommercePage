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
   - Open [http://localhost:3000](http://localhost:3001) in your browser for buyer.
   - Open [http://localhost:3000/seller](http://localhost:3001/seller) in your browser for seller.

## Usage

- Use the "+Add a Listing" form to add new products.
- Drag and drop or click to upload an image.
- View all listings in the "All Listings" section.
- Click "DELETE" to remove a listing.

## Project Management

Track progress and tasks on the [Trello Board](https://trello.com/b/M2WDHkXa/ecommerce).


## Screenshots
Buyer Page. What the customer sees with optional login.
<img width="1258" height="605" alt="Screenshot 2025-09-04 at 9 15 07 AM" src="https://github.com/user-attachments/assets/63b9026f-275d-42a5-9952-c51dda3cf7bc" />
Seller Page. With the ability to edit and add listings. Login is mandetory.
<img width="1255" height="576" alt="Screenshot 2025-09-04 at 9 15 55 AM" src="https://github.com/user-attachments/assets/31ed3b14-1e01-45d9-a046-92f5aa3f6bc6" />
<img width="802" height="521" alt="Screenshot 2025-09-04 at 9 15 17 AM" src="https://github.com/user-attachments/assets/dce18a2d-6d16-4bdc-b604-1a57e6527d3b" />
<img width="1257" height="572" alt="Screenshot 2025-09-04 at 9 15 41 AM" src="https://github.com/user-attachments/assets/1534625e-43e0-4ee0-8e76-c8a5536e4b88" />


## License

MIT

---
**Made with ❤️ for sellers and small businesses.**
