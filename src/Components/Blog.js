import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import "./Blog.css"
import { Grid } from '@mui/material';



function Blog({blog}) {
    
  return (
    <Grid item xs={2} md={6} className='test'> 
    <CardActionArea component="a" href={`/blogs/${blog.id}`}>
        <Card  className="card" sx={{ display: 'flex'}}>
            <CardContent>
                <CardMedia
                component="img"
                sx={{ width: 50, height:50, display: { xs: 'none', sm: 'block' } }}
                image={blog.image}
                alt={blog.image} />
            </CardContent>
            <div>
                <Typography component="h3" variant="component">
                    {blog.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {blog.author}
                </Typography>
            <div className='text'>
                <Typography className="desc" variant="caption" >
                    {blog.body}
                </Typography>
            </div>
            <Typography variant="subtitle2" color="primary">
                Read More
            </Typography>

            </div>
            <div>
            </div>

        </Card>

    </CardActionArea>
    </Grid>

  )
}

export default Blog