import React, { useEffect, useState } from "react";
import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';



function App() {

  const [data, setData] = useState({});

  useEffect(() => {
    // Fetch data from the server
    fetch(`http://localhost:3001/all`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [data]);

  function handleDelete(name) {
    fetch(`http://localhost:3001/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })
      .then((response) => response.json())
      .then(() => {
        // Refetch items after delete
        fetch('http://localhost:3001/all')
          .then((response) => response.json())
          .then((data) => setData(data));
      })
      .catch((error) => console.error('Error deleting item:', error));
  }

  function handleSubmit() {
    //event.preventDefault();
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const inventory = document.getElementById('inventory').value;

    fetch(`http://localhost:3001/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, price, quantity: inventory }),
    })
      .then((response) => response.json())
      .then(() => {
        // Refetch items after create
        fetch('http://localhost:3001/all')
          .then((response) => response.json())
          .then((data) => setData(data))
      })
      .catch((error) => console.error('Error creating item:', error));
  }

  function refreshPage() {
    window.location.reload();
  }


  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Button className="navbar-brand" onClick={refreshPage}>Home</Button>
        </nav>
      </div>
      <div>
        <h1>Welcome to your Shop</h1>
      </div>

      <div>
        <div className="card-center">
          <Card style={{ width: '25rem' }}>
            <form onSubmit={handleSubmit}>
              <Card.Header className="text-center">+Add a Listing</Card.Header>
              <input type="text" placeholder="name" id="name" />
              <input type="text" placeholder="price" id="price" />
              <input type="text" placeholder="inventory" id="inventory" />

              <div className="button-container">
                <Button variant="primary" type="submit">
                  CREATE
                </Button>
              </div>
            </form>
          </Card>

        </div>
        <h2>All Listings</h2>
        <div className="card-grid">
          {data.results ? (
            data.results.map((item) => (
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <div key={item.id}>
                    <h2>{item.name}</h2>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <div className="button-container">
                      <Button variant="danger" onClick={() => handleDelete(item.name)}>DELETE</Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No items found</p>
          )}
        </div>
      </div>
    </>
  )
}

export default App;