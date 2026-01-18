import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function CardGrid({ data, onAdd }) {
  return (
    <div className="card-grid" style={{ gap: '.5rem', margin: '.5rem' }}>
      {data?.results ? (
        data.results.map((item) => (
          <Card style={{ width: '15rem' }} key={item.id}>
            <img
              src={`http://localhost:3001/image/${item.id}`}
              alt="no image"
              className="listing-img"
            />
            <Card.Body>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li>{item.name}</li>
                <li>
                  <strong>${item.price}</strong>
                </li>
              </ul>
              <Button
                className="create-btn"
                disabled={item.quantity < 1}
                onClick={() => onAdd(item)}
              >
                {item.quantity > 0 ? 'Add To Cart' : 'Out of Stock'}
              </Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
