
import { useEffect, useState } from 'react'
import Blog from './Blog.js'
import axios from 'axios';

import * as React from 'react';
import Grid from '@mui/material/Grid';
import './Blog.css'


const API = process.env.REACT_APP_API_URL;

function Blogs() {
    const [blogs, setBlogs] = useState([])

    useEffect(()=>{
        axios
            .get(`${API}/blogs`)
            .then((response) => setBlogs(response.data))
            .catch((e) => console.error("catch", e));
    },[]);
    return (
    <div>
       <Grid container spacing={3}>
            {blogs.map((blog)=> {
                return <Blog key={blog.id} blog={blog} />
            })}

        </Grid>
    </div>
    )
}

export default Blogs

// {blogs.map((blog)=> {
//     return <Blog key={blog.id} blog={blog} />
// })}