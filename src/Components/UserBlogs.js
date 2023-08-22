import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Blog from './Blog';
import { Container } from '@mui/material';

import './UserBlog.css'
const API = process.env.REACT_APP_API_URL;


function UserBlogs() {

    const [blogs, setBlogs] = useState([]);

    const { index } = useParams();
    let navigate = useNavigate();


    useEffect(() => {
        axios
            .get(`${API}/users/${index}/posts`)
            .then((response) => {
                console.log(response.data)
                setBlogs(response.data);
            })
            .catch(() => {
                navigate("/not-found");
            });
        }, [index, navigate]);
  return (
    <div>
        <div className='userInfo'>
            <p className='name'>{index}</p>
        </div>
        <div className='blogs'>
            {!blogs.length ? <div className='noPostError'>User has no blogs</div> 
            :
            <Container>
            <div className='blog-box'>
                <div style={{marginBottom:20}}> Recent Posts </div>
                {blogs.map((blog)=> {
                    return <Blog key={blog.id} blog={blog} />
                })}
            </div>
            </Container>
            
            }
        </div>
    </div>
  )
}

export default UserBlogs