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

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/all`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-custom"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div></div>
        <div style={{ display: 'flex', alignItems: 'center' }}>

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
          >
            Cart
          </Button>
            </>
          )}
          {user && (
            <>
              <span style={{ color: "#8d6748", fontWeight: "bold", marginRight: "1rem" }}>
                {user.email}
              </span>
              <Button
                className="create-btn"
                style={{ marginRight: "1rem" }}
                onClick={() => setUser(null)}
              >
                Logout
              </Button>
              <Button
            className="create-btn"
            style={{ marginRight: "1rem" }}
            onClick={() => alert("Cart feature coming soon!")}
          >
            Cart
          </Button>
            </>
          )}
        </div>
      </nav>
      {showLogin ? (
        <div style={{ textAlign: "center", margin: "2rem 0" }}>
          <Login onLogin={(userData) => { setUser(userData); setShowLogin(false); }} />
        </div>
      ) : (
        <>
          <div style={{ textAlign: "center", margin: "2rem 0" }}>
            <h1 style={{ color: "#8d6748", margin: "1rem 0" }}>Skye Eclisse</h1>
            <div style={{ margin: "1rem 0", color: "#b97a56", fontWeight: "bold" }}>
              Website under construction.<br />
              To shop, visit: <a href="https://www.etsy.com/shop/SkyeEclisse" target="_blank" rel="noopener noreferrer" style={{ color: "#8d6748", textDecoration: "underline" }}>
                https://www.etsy.com/shop/SkyeEclisse
              </a>
            </div>
          </div>
          <div className="card-grid">
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
                    <Button className="create-btn" disabled={item.quantity < 1}>
                      {item.quantity > 0 ? "Add To Cart" : "Out of Stock"}
                    </Button>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p>No items found</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default BuyerPage;
