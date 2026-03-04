import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Card, CardContent, CardActions, Typography, Container } from '@mui/material';

function BlogDetail() {
  const [blog, setBlog] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:1337/api/blogs/${id}?populate=*`)
      .then(response => response.json())
      .then(data => setBlog(data.data))
      .catch(error => console.error('Error fetching blog:', error));
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      fetch(`http://localhost:1337/api/blogs/${id}`, {
        method: 'DELETE',
      })
      .then(() => {
        // redirect to blog list
        window.location.href = '/blog';
      })
      .catch(error => console.error('Error deleting blog:', error));
    }
  };

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h4" component="div">
            {blog.title}
          </Typography>
          {blog?.product && (
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Product: {blog.product.name}
            </Typography>
          )}
          <Typography variant="body2">
            {blog.content}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" component={Link} to={`/blog/${id}/edit`}>Edit</Button>
          <Button size="small" color="error" onClick={handleDelete}>Delete</Button>
        </CardActions>
      </Card>
    </Container>
  );
}

export default BlogDetail;
