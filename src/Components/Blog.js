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
        <Card sx={{ display: 'flex'}}>
            <CardContent>
                <CardMedia
                component="img"
                sx={{ width: 160, height:180, display: { xs: 'none', sm: 'block' } }}
                image={blog.image}
                alt={blog.image} />
            </CardContent>
            <div>
                <Typography component="h2" variant="h5">
                {blog.title}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
                {blog.author}
            </Typography>
            <div className='' style={{overflow:"hidden", textOverflow:"ellipsis", width:500}}>
                <Typography className="desc" variant="subtitle2" noWrap >
                    {blog.body}
                </Typography>
            </div>
            <Typography variant="subtitle2" color="primary">
                Continue reading...
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