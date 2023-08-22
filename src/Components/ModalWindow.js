import React from 'react'
import "./ModalWindow.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '@mui/material';

const API = process.env.REACT_APP_API_URL;

function ModalWindow({id, setModal}) {
    let navigate = useNavigate();
    
    const handleDelete = () => {
        axios
          .delete(`${API}/blogs/${id}`)
          .then(() => {
            navigate(`/blogs`);
          })
          .catch((e) => console.error(e));
      };

      function handleCancel(){
        setModal(false)
      }
  return (
    <div>
        <section className="modal hidden">
            <div className="flex">
                <div></div>
                <button className="btn-close" onClick={handleCancel}>⨉</button>
            </div>
            <div className='text'>
                <h2>Confirmation</h2>
                <p>
                Are you sure you want to delete this blog?
                </p>
            </div>
            <Button variant='outlined' color="error" onClick={handleDelete} startIcon={<DeleteIcon />}>Delete</Button>
            <Button variant='outlined' color="inherit" onClick={handleCancel}> Cancel</Button>
        </section>

        <div className="overlay hidden"></div>
    </div>
  )
}

export default ModalWindow