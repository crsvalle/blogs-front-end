import * as React from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import ArticleIcon from '@mui/icons-material/Article';

import "./Blog.css"
import { Grid } from '@mui/material';

function stripHtmlTags(html) {
    return html.replace(/<[^>]*>/g, ' ');
  }

  
  function Blog({blog}) {
      const strippedBody = stripHtmlTags(blog.body || '');
      
      const handleCardClick = () => {
        window.location.href = `/blogs/${blog.id}`;
      };

    return (
        <Grid item xs={2} md={6} className='test'> 
        <CardActionArea onClick={handleCardClick}>
            <Card  className="card" sx={{ display: 'flex', minHeight:90, maxHeight:90}}>
                <CardContent>
                    {!blog.image ? 
                    <ArticleIcon fontSize='large' sx={{mr: 2}}/>
                    // <CardMedia
                    // component="img"
                    // sx={{ width: 50, height:50, display: { xs: 'none', sm: 'block' } }}
                    // image={'https://st4.depositphotos.com/11351024/23684/i/1600/depositphotos_236842700-stock-photo-blank-white-sheet-lines-empty.jpg'}
                    // alt={blog.id} />
                    :
                    <CardMedia
                    component="img"
                    sx={{ width: 50, height:50, display: { xs: 'none', sm: 'block' } }}
                    image={blog.image}
                    alt={blog.image} />
                    }
        
                </CardContent>
                <div>
                    <Typography component="h3" variant="component">
                        {blog.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        <a href={`/user/${blog.author}`}>{blog.author}</a>
                    </Typography>
                <div className='text'>
                    <Typography className="desc" variant="caption" >
                        {strippedBody}
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