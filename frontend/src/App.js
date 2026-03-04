import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import './App.css';
import Products from './Products';
import Blog from './Blog';
import ProductDetail from './ProductDetail';
import ProductForm from './ProductForm';
import BlogDetail from './BlogDetail';
import BlogForm from './BlogForm';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CMS
          </Typography>
          <Button color="inherit" component={Link} to="/products">Products</Button>
          <Button color="inherit" component={Link} to="/blog">Blog</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/products" />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/new" element={<ProductForm />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products/:id/edit" element={<ProductForm />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/new" element={<BlogForm />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/blog/:id/edit" element={<BlogForm />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
