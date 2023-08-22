import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material'
import React from 'react'

import "./ModalError.css"

const API = process.env.REACT_APP_API_URL;

function ModalError({id, setModal}) {

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
    <Box>
      <section className="modal hidden">
            <div className="flex">
                <div></div>
                <button className="btn-close" onClick={handleCancel}>⨉</button>
            </div>
            <div className='text'>
                <h3>Confirmation</h3>
                <p>
                Are you sure you want to delete this?
                </p>
            </div>
            <button className="btn" onClick={handleDelete}>Delete</button>
            <button className='' onClick={handleCancel}>Cancel</button>
        </section>

      <div className="overlay hidden"></div>
  </Box>
  )
}

export default ModalError