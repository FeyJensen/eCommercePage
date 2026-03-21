import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Header from './components/Header';
import Footer from './components/footer.jsx';


function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/cart')
      .then((res) => res.json())
      .then((data) => setCartItems(data.cart || []))
      .catch((err) => console.error('Error fetching cart:', err));
  }, []);

  async function handleRemove(id) {
    try {
      const response = await fetch('http://localhost:3001/cart/remove', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await response.json();
      if (response.ok) {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
      } else {
        alert(data.message || 'Error removing item');
      }
    } catch (err) {
      alert('Error removing item');
      console.error(err);
    }
  }

  function handleCheckout() {
    alert('Checkout not implemented yet.');
  }

  // Calculate total
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="background">
      <Header />
      <div className="container" style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
        <div style={{ flex: 3 }}>
          <nav
            className="navbar navbar-expand-lg navbar-custom"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2 style={{ color: "#8d6748", margin: "1rem 0" }}>Your Cart</h2>
          </nav>
          <div className="card-grid">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <Card style={{ width: "15rem" }} key={item.id}>
                  <img
                    src={`http://localhost:3001/image/${item.item_id}`}
                    alt="no image"
                    className="listing-img"
                  />
                  <Card.Body>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      <li><strong>Name:</strong> {item.name}</li>
                      <li><strong>Price:</strong> ${item.price}</li>
                      <li><strong>Quantity:</strong> {item.quantity}</li>
                    </ul>
                    <Button
                      variant="danger"
                      style={{ width: "100%", marginBottom: "0.5rem" }}
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p style={{ textAlign: "center", width: "100%" }}>Your cart is empty.</p>
            )}
          </div>
          {cartItems.length > 0 && (
            <div style={{ textAlign: "center", margin: "2rem 0" }}>
              <Button
                className="create-btn"
                style={{ padding: "0.7rem 2rem", fontSize: "1.1em" }}
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </div>
          )}
        </div>
        {/* Total cost */}
        <div style={{ marginTop: '30px',flex: 1, marginLeft: '2rem', background: '#f8f4f0', borderRadius: '8px', padding: '2rem', minWidth: '220px', maxHeight: '300px', boxShadow: '0 2px 8px #e0d6c3' }}>
          <h3 style={{ color: '#8d6748', marginBottom: '1.5rem', textAlign: 'center' }}>Total</h3>
          <div style={{ fontSize: '1.5em', color: '#4d3c2b', textAlign: 'center' }}>
            ${total.toFixed(2)} 
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default CartPage;