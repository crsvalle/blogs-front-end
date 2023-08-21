
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
import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';


const API = process.env.REACT_APP_API_URL;

function Blogs() {
    const [blogs, setBlogs] = useState([])
    const [copy, setCopy] = useState([])
    const [bool, setBool] = useState(0)

    useEffect(()=>{
        axios
            .get(`${API}/blogs`)
            .then((response) =>{
            setBlogs(response.data)
            setCopy(response.data)})
            .catch((e) => console.error("catch", e));
    },[]);


    // setCopy([...copy.map((e) => e).sort((a, b) => a.id - b.id)]);
    
    function sortBy(type){
        const arr = ['General', "Games", 'Movie', 'Food', 'Travel']
        setCopy([...blogs.map((e) => e).filter((obj) =>  { return obj.type === type})]);
        setBool(arr.indexOf(type)+2)
    }

    function getAll(){
        setCopy(blogs);
        setBool(0)
    }

    return (
    <div className='box'>
        <div className='sidebar'>
            <div className={bool === 0 ? "sideBarRow selected ": 'sideBarRow'} onClick={getAll}><RectangleOutlinedIcon className='sideBarIcon' /><h2 className='sideBarTitle'>All</h2></div>
            <div className={bool === 2 ? "sideBarRow selected ": 'sideBarRow'} onClick={() => sortBy('General')}><ForumIcon className='sideBarIcon' /><h2 className='sideBarTitle'>General</h2></div>
            <div className={bool === 3 ? "sideBarRow selected ": 'sideBarRow'} onClick={() => sortBy('Games')}><GamesIcon className='sideBarIcon'/> <h2 className='sideBarTitle'>Games</h2></div>
            <div className={bool === 4 ? "sideBarRow selected ": 'sideBarRow'} onClick={() => sortBy('Movie')}><TheatersIcon  className='sideBarIcon'/> <h2 className='sideBarTitle'>Movies</h2></div>
            <div className={bool === 5 ? "sideBarRow selected ": 'sideBarRow'} onClick={() => sortBy('Food')}> <LocalDiningIcon  className='sideBarIcon'/><h2 className='sideBarTitle'>Food</h2></div>
            <div className={bool === 6 ? "sideBarRow selected ": 'sideBarRow'} onClick={() => sortBy('Travel')}><CardTravelIcon  className='sideBarIcon'/><h2 className='sideBarTitle'>Travel</h2></div>
        </div>
        <div>
        <Container className='blogs'>
            <div>
                {copy.length !== 0 ? 
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
