
import { useEffect, useState } from 'react'
import Blog from './Blog.js'
import axios from 'axios';

import * as React from 'react';
import './Blogs.css'
import { Container } from '@mui/material';

import GamesIcon from '@mui/icons-material/Games';
import TheatersIcon from '@mui/icons-material/Theaters';
import ForumIcon from '@mui/icons-material/Forum';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import CardTravelIcon from '@mui/icons-material/CardTravel';


const API = process.env.REACT_APP_API_URL;

function Blogs() {
    const [blogs, setBlogs] = useState([])
    const [copy, setCopy] = useState([])

    useEffect(()=>{
        axios
            .get(`${API}/blogs`)
            .then((response) => setBlogs(response.data))
            .catch((e) => console.error("catch", e));
    },[]);

    // WORK ON SORTING
    function sortByGames(){
        setCopy([...blogs.map((e) => e).filter((obj) =>  { return obj.type === "Games"})]);
    }

    console.log(copy)
    return (
    <div className='box'>
        <div className='sidebar'>
            <div className='sideBarRow'><ForumIcon className='sideBarIcon' /><h2 className='sideBarTitle'>General</h2></div>
            <div className='sideBarRow' onClick={sortByGames}><GamesIcon className='sideBarIcon'/> <h2 className='sideBarTitle'>Games</h2></div>
            <div className='sideBarRow'><TheatersIcon  className='sideBarIcon'/> <h2 className='sideBarTitle'>Movies</h2></div>
            <div className='sideBarRow'> <LocalDiningIcon  className='sideBarIcon'/><h2 className='sideBarTitle'>Food</h2></div>
            <div className='sideBarRow'><CardTravelIcon  className='sideBarIcon'/><h2 className='sideBarTitle'>Travel</h2></div>
        </div>
        <div>
        <Container className='blogs'>
            <div>
                {copy.length !== 0? 
                   copy.map((blog)=> {
                    return <Blog key={blog.id} blog={blog} />
                }):
                <div>No blogs in this category</div>
                }
            </div>
        </Container>
        </div>
    </div>
    )
}

export default Blogs
