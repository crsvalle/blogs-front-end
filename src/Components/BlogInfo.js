import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom';

import './BlogInfo.css'
import { Button, Card } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import parse from 'html-react-parser';
import ModalWindow from './ModalWindow';
import Comments from './Comments';


const API = process.env.REACT_APP_API_URL;


function BlogInfo() {
    const [blog, setBlog] = useState([])
    const [modal, setModal] = useState(false)
    let navigate = useNavigate();
    let {index} = useParams();

    const getUserIDFromLocalStorage = () => {
      return localStorage.getItem('id') || 'null'; // Change 'id' to the actual key
    };

    const userId = getUserIDFromLocalStorage()

  
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

    function handleModal(){
      setModal(true)
    }

    let body = parse(`${blog.body}`)


  return (
    <div className='infoPage'>
      {modal ? <ModalWindow id={index} setModal={setModal} /> :null}
          {!blog.image 
          ? 
          <div className='noImageBody'>
            <div className='noImageTexts'>
                <h1>{blog.name}</h1>
                {body}
            </div>
            <div className='header2'>
              <Card className='info2'>
                <Link style={{textDecoration:"none"}} to={`/user/${blog.author}`}><h3> {blog.author}</h3> </Link>
                <p><span>Category:</span> {blog.type}</p>
                <p>Posted on: {blog.date}</p>
                { blog.author_id +'' === userId  ? 
            <div>
             <Link className="link" style={{textDecoration:'none'}} to={`/blogs/${index}/edit`}>
             <Button variant='outlined' color="info" startIcon={<EditIcon />}> Edit
             </Button>
              </Link>
              <Button variant='outlined' color="error" onClick={handleModal} startIcon={<DeleteIcon />} >
                Delete
              </Button> 
         </div>: 
         ''}
              </Card>
            </div>
         </div>
          :
          <div>
             <div className='header'>
             <div className='content'>
                 <img className="blogImage" alt={blog.image} src={blog.image} />
             </div>
             <Card className='info'>
             <Link style={{textDecoration:"none"}} to={`/user/${blog.author}`}><h2> {blog.author}</h2> </Link>
             <p><span>Category:</span> {blog.type}</p>
             <p>Posted on: {blog.date}</p>
             
             { blog.author_id + '' === userId  ? 
            <div>
             <Link className="link" style={{textDecoration:'none'}} to={`/blogs/${index}/edit`}>
             <Button variant='outlined' color="info" startIcon={<EditIcon />}> Edit
             </Button>
              </Link>
              <Button variant='outlined' color="error" onClick={handleModal} startIcon={<DeleteIcon />} >
                Delete
              </Button> 
         </div>: 
         ''}
             </Card>
         </div>
         <div>
             <h1>{blog.name}</h1>
             {body}
         </div>
         </div>
          }

          <Comments key={blog.id} id={index}/>
    </div>
  )
}

export default BlogInfo