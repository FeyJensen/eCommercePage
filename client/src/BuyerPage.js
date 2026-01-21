import React, { useEffect, useState } from "react";
import './App.css';
import Login from './Login';
import { useNavigate } from "react-router-dom";
import UnderConstruction from './components/UnderConstruction';
import Header from './components/Header';
import CardGrid from './components/CardGrid';
import LoginAndCart from './components/LoginAndCart';
import ShopBanner from './components/ShopBanner';
import Footer from './components/footer.jsx';

function BuyerPage() {
  const [data, setData] = useState({});
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
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
      <ShopBanner
        header={
          <Header 
            showLogin={showLogin}
            user={user}
            onLoginClick={() => setShowLogin(true)}
            onCartClick={() => navigate('/cart')}
          />
        }
      />
      {showLogin ? (
        <div style={{ textAlign: "center", margin: "2rem 0" }}>
          <Login onLogin={(userData) => { setUser(userData); setShowLogin(false); }} />
        </div>
      ) : (
        <>
          <div className="container">
            <UnderConstruction />
          </div>
        </>
      )}

      <div style={{ paddingLeft: '8rem', paddingRight: '8rem', paddingBottom: '8rem' }}>
        <CardGrid data={data} onAdd={handleAddToCart} />
      </div>
      <Footer />
    </div>
  );
}

export default BuyerPage;
