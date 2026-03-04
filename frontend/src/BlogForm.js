import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function BlogForm() {
  const [blog, setBlog] = useState({ title: '', content: '' });
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  useEffect(() => {
    fetch('http://localhost:1337/api/products')
      .then(response => response.json())
      .then(data => setProducts(data.data))
      .catch(error => console.error('Error fetching products:', error));

    if (isEditing) {
      fetch(`http://localhost:1337/api/blogs/${id}?populate=product`)
        .then(response => response.json())
        .then(data => {
          setBlog(data.data.attributes);
          if (data.data.attributes.product.data) {
            setSelectedProduct(data.data.attributes.product.data.id);
          }
        })
        .catch(error => console.error('Error fetching blog:', error));
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog(prevBlog => ({
      ...prevBlog,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = isEditing ? `http://localhost:1337/api/blogs/${id}` : 'http://localhost:1337/api/blogs';
    const method = isEditing ? 'PUT' : 'POST';

    const { title, content } = blog;
    const data = {
      title,
      content,
    };

    if (selectedProduct) {
      data.product = {
        connect: [selectedProduct],
      };
    } else if (isEditing && blog.product?.data) {
      data.product = {
        disconnect: [blog.product.data.id],
      };
    }

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    })
    .then(() => {
      navigate('/blog');
    })
    .catch(error => console.error('Error saving blog:', error));
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {isEditing ? 'Edit Blog Post' : 'Add Blog Post'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Title"
            name="title"
            value={blog.title}
            onChange={handleChange}
            fullWidth
            required
          />
          <FormControl fullWidth>
            <InputLabel id="product-select-label">Product</InputLabel>
            <Select
              labelId="product-select-label"
              value={selectedProduct}
              label="Product"
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {products.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Content"
            name="content"
            value={blog.content}
            onChange={handleChange}
            fullWidth
            multiline
            rows={10}
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

export default BlogForm;
