import React, { useEffect, useState, useCallback } from "react";
import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import { useDropzone } from 'react-dropzone'
import Login from './Login';


function App() {

  const [data, setData] = useState({});
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [user, setUser] = useState(null);
  const [createMessage, setCreateMessage] = useState('');
  const [isCreating, setIsCreating] = useState(false);



  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file);
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


  useEffect(() => {
    // Fetch data from the server
    fetch(`http://localhost:3001/all`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  function handleDelete(id) {
    fetch(`http://localhost:3001/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
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

 function handleSubmit(event) {
  event.preventDefault();
  setIsCreating(true);
  setCreateMessage('');

  const nameInput = document.getElementById('name');
  const priceInput = document.getElementById('price');
  const inventoryInput = document.getElementById('inventory');

  const name = nameInput.value;
  const price = priceInput.value;
  const inventory = inventoryInput.value;

  const formData = new FormData();
  formData.append('name', name);
  formData.append('price', price);
  formData.append('quantity', inventory);
  if (file) {
    formData.append('image_file', file);
  }

  fetch(`http://localhost:3001/create`, {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message && data.message.toLowerCase().includes('success')) {
        setCreateMessage('Listing created successfully!');
        // Clear inputs after successful add
        nameInput.value = '';
        priceInput.value = '';
        inventoryInput.value = '';
        setPreview(null);
        setFile(null);
      } else {
        setCreateMessage(data.message || 'Error creating listing.');
      }
      setIsCreating(false);
      fetch('http://localhost:3001/all')
        .then((response) => response.json())
        .then((data) => setData(data));
    })
    .catch((error) => {
      setCreateMessage('Error creating listing.');
      setIsCreating(false);
      console.error('Error creating item:', error);
    });
}

  function refreshPage() {
    window.location.reload();
  }


  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-custom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button
            className="navbar-brand"
            style={{ marginBottom: '.5rem', marginLeft: '.5rem' }}
            onClick={refreshPage}
          >
            Home
          </Button>
          <Button
            variant="outline-secondary"
            style={{ marginRight: '.8rem', marginBottom: '.5rem' }}
            onClick={() => setUser(null)}
          >
            Logout
          </Button>
        </nav>
      </div>
      <div>
        <h1>Seller Center</h1>
      </div>

      <div>
        <div className="card-center">
          <Card style={{ width: '25rem' }}>
            <form onSubmit={handleSubmit}>
              <Card.Header className="text-center">+Add a Listing</Card.Header>
              <input type="text" placeholder="name" id="name" />
              <input type="text" placeholder="price" id="price" />
              <input type="text" placeholder="inventory" id="inventory" />

              <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the image here ...</p>
                ) : (
                  <p>Drag 'n' drop an image here, or click to select one</p>
                )}
                {preview && <img src={preview} alt="Preview" className="preview-img" style={{ width: '20%', marginTop: 10, marginBottom: 10 }} />}
              </div>
              {isCreating && (
                <div style={{ color: '#8d6748', textAlign: 'center', margin: '0.5rem 0' }}>
                  Adding listing...
                </div>
              )}
              {createMessage && (
                <div style={{ color: createMessage.includes('success') ? 'green' : 'red', textAlign: 'center', margin: '0.5rem 0' }}>
                  {createMessage}
                </div>
              )}
              <div className="button-container">
                <Button className="create-btn" type="submit" style={{ marginBottom: '1.5rem' }}>
                  CREATE
                </Button>
              </div>
            </form>
          </Card>
        </div>

        <h1 style={{ textAlign: 'center ' }}>All Listings</h1>
        <div className="card-grid">
          {data.results ? (
            data.results.map((item) => (
              <Card style={{ width: '15rem' }}>
                <img
                  src={`http://localhost:3001/image/${item.id}`}
                  alt="no image"
                  className="listing-img"
                />
                <Card.Body>
                  <div key={item.id}>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      <li><strong>Name:</strong> {item.name}</li>
                      <li><strong>Price:</strong> ${item.price}</li>
                      <li><strong>Quantity:</strong> {item.quantity}</li>
                    </ul>
                    <div className="button-container">
                      <Button variant="danger" onClick={() => handleDelete(item.id)}>DELETE</Button>
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