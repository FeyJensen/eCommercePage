import React, { useEffect, useState } from "react";
import './App.css';
import { useNavigate } from "react-router-dom";
import UnderConstruction from './components/UnderConstruction';
import Header from './components/Header';
import CardGrid from './components/CardGrid';
import ShopBanner from './components/ShopBanner';
import Footer from './components/footer.jsx';

function BuyerPage() {
  const [data, setData] = useState({});
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/all`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  async function handleAddToCart(item) {
    try {
      const response = await fetch('http://localhost:3001/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: item.name,
          quantity: 1, // default add 1 to cart
          price: item.price,
          cartTotal: item.price // for single item, cartTotal = price
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setCart((prevCart) => [...prevCart, data.cartItem]);
        alert('Added to cart!');
      } else {
        alert(data.message || 'Error adding to cart');
      }
    } catch (err) {
      alert('Error adding to cart');
      console.error(err);
    }
  }

  return (
    <div>
      <Header />
      <ShopBanner/>
      <UnderConstruction />    
        <CardGrid data={data} onAdd={handleAddToCart} />
      <Footer />
    </div>
  );
}

export default BuyerPage;
