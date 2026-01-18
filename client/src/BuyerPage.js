import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './App.css';
import Login from './Login';
import { useNavigate } from "react-router-dom";

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

  function UnderConstruction() {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-custom"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ textAlign: "center", margin: "1rem 0" }}>
          <h1 style={{ color: "#8d6748", margin: "1rem 0" }}>Skye Eclisse</h1>
          <div style={{ margin: "1rem 0", color: "#b97a56", fontWeight: "bold" }}>
            Website under construction.<br />
            To shop, visit: <a href="https://www.etsy.com/shop/SkyeEclisse" target="_blank" rel="noopener noreferrer" style={{ color: "#8d6748", textDecoration: "underline" }}>
              https://www.etsy.com/shop/SkyeEclisse
            </a>
          </div>
        </div>
      </nav>
    );
  }

  function LoginAndCartHeader() {
    return (
      <div className="navbar-brand" style={{ display: 'flex' }}>
        {!showLogin && !user && (
          <>
            <Button
              className="create-btn"
              style={{ marginRight: "1rem" }}
              onClick={() => setShowLogin(true)}
            >
              Login
            </Button>
            <Button
              className="create-btn"
              style={{ marginRight: "1rem" }}
              onClick={() => navigate('/cart')}
            >Cart
            </Button>
          </>
        )}
      </div>)
  }

  function CardGrid() {
    return (
      <div className="card-grid" style={{ gap: '.5rem', margin: '.5rem' }}>
        {data.results ? (
          data.results.map((item) => (
            <Card style={{ width: '15rem' }} key={item.id}>
              <img
                src={`http://localhost:3001/image/${item.id}`}
                alt="no image"
                className="listing-img"
              />
              <Card.Body>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  <li> {item.name}</li>
                  <li><strong>${item.price}</strong> </li>
                </ul>
                <Button
                  className="create-btn"
                  disabled={item.quantity < 1}
                  onClick={() => handleAddToCart(item)}
                >
                  {item.quantity > 0 ? "Add To Cart" : "Out of Stock"}
                </Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    )
  }

  function ShopBanner() {
    return (
      <div style={{
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        height: '390px'
      }}>
        <img
          src="images/header.png"
          alt="Shop Banner"
          style={{
            width: '100%',
            height: '100%',
            display: 'block',
            objectFit: 'cover',
            objectPosition: 'center',
            transform: 'scale(1.05)'
          }}
        />
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          zIndex: 10
        }}>
          <LoginAndCartHeader />
        </div>
      </div>
    );
  }

  return (
    <div>
      <ShopBanner />
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

      <div style={{ paddingLeft: '8rem', paddingRight: '8rem' }}>
        <CardGrid />
      </div>

    </div>
  );
}

export default BuyerPage;
