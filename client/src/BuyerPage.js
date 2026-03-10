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

  function handleAddToCart(item) {
    setCart((prevCart) => [...prevCart, item]);
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
