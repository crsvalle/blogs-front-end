import { Box, Container } from '@mui/material'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Blog from '../Components/Blog';

const API = process.env.REACT_APP_API_URL;

function Results() {
  const [blogs, setBlogs] = useState([])

  const {searchItem} = useParams();

  useEffect(()=>{
    axios
        .get(`${API}/search?query=${searchItem}`)
        .then((response) =>{
        setBlogs(response.data)}
        )
        .catch((e) => console.error("catch", e));
},[]);

console.log(blogs)
  return (
    <Box sx={{minHeight:500}}>
      <Container>
            <div>Search: {searchItem}</div>
            <div className='blog-box'>
              <div>Results</div>
                {blogs.length !== 0 ? 
                blogs.map((blog)=> {
                    return <Blog key={blog.id} blog={blog} />
                }):
                <div>No results from search</div>
                }
            </div>
        </Container>
    </Box>
  )
}

export default Results