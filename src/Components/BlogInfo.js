import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom';

import './BlogInfo.css'
import { Button, Card, Container } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import parse from 'html-react-parser';


const API = process.env.REACT_APP_API_URL; 


function BlogInfo() {
    const [blog, setBlog] = useState([])
    let navigate = useNavigate();
    let {index} = useParams();
  
    useEffect(() => {
      axios
        .get(`${API}/blogs/${index}`)
        .then((response) => {
          setBlog(response.data);
        })
        .catch(() => {
          navigate("/not-found");
        });
    }, [index, navigate]);


    let body = parse(`${blog.body}`)

  return (
    <div className='infoPage'>
        <div className='header'>
            <div className='content'>
                <img src={blog.image} />
            </div>
            <Card className='info'>
            <h2> {blog.author}</h2>
            <p><span>Category:</span> {blog.type}</p>
            <p>Posted on: {blog.date}</p>
            <Link className="link" style={{textDecoration:'none'}} to={`/blogs/${index}/edit`}>
                <Button variant='outlined' color="info" startIcon={<EditIcon />}> Edit
                </Button>
            </Link>
            <Button variant='outlined' color="error" startIcon={<DeleteIcon />}>Delete</Button>
            </Card>
        

        </div>
        <div>
            <h1>{blog.name}</h1>
            {body}
        </div>
    </div>
  )
}

export default BlogInfo