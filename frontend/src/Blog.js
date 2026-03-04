import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, CardContent, CardActions, Button, Typography, Container, Box } from '@mui/material';

function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:1337/api/blogs?populate=*')
      .then(response => response.json())
      .then(data => setBlogs(data.data))
      .catch(error => console.error('Error fetching blogs:', error));
  }, []);

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" component={Link} to="/blog/new">
          Add Blog Post
        </Button>
      </Box>
      <Grid container spacing={4}>
        {blogs.map(blog => (
          <Grid item key={blog.id} xs={12}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  by {blog.product?.name}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  {blog.content.substring(0, 200)}...
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`/blog/${blog.id}`}>Read More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Blog;
