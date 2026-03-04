import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Card, CardContent, CardActions, Typography, Container } from '@mui/material';

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:1337/api/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data.data))
      .catch(error => console.error('Error fetching product:', error));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      fetch(`http://localhost:1337/api/products/${id}`, {
        method: 'DELETE',
      })
      .then(() => {
        // redirect to products list
        window.location.href = '/products';
      })
      .catch(error => console.error('Error deleting product:', error));
    }
  };

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h4" component="div">
            {product.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            ${product.price}
          </Typography>
          <Typography variant="body2">
            {product.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" component={Link} to={`/products/${id}/edit`}>Edit</Button>
          <Button size="small" color="error" onClick={handleDelete}>Delete</Button>
        </CardActions>
      </Card>
    </Container>
  );
}

export default ProductDetail;
