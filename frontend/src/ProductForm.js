import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

function ProductForm() {
  const [product, setProduct] = useState({ name: '', description: '', price: '' });
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      fetch(`http://localhost:1337/api/products/${id}`)
        .then(response => response.json())
        .then(data => setProduct(data.data.attributes))
        .catch(error => console.error('Error fetching product:', error));
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = isEditing ? `http://localhost:1337/api/products/${id}` : 'http://localhost:1337/api/products';
    const method = isEditing ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: product }),
    })
    .then(() => {
      navigate('/products');
    })
    .catch(error => console.error('Error saving product:', error));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {isEditing ? 'Edit Product' : 'Add Product'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Name"
            name="name"
            value={product.name}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Description"
            name="description"
            value={product.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            required
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
            fullWidth
            required
          />
          <Button type="submit" variant="contained" color="primary">
            {isEditing ? 'Save' : 'Add'}
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default ProductForm;
