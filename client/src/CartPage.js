import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function CartPage({ cartItems = [], onRemove, onCheckout }) {
  return (
    <div>
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
                src={`http://localhost:3001/image/${item.id}`}
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
                  onClick={() => onRemove(item.id)}
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
            onClick={onCheckout}
          >
            Checkout
          </Button>
        </div>
      )}
    </div>
  );
}
export default CartPage;