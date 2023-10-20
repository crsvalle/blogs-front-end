import React from 'react'
import "./ModalWindow.css"
import axios from 'axios';

import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const API = process.env.REACT_APP_API_URL;

function ModalWindow({id, setModal}) {
    let navigate = useNavigate();
    
    const handleDelete = () => {
        axios
          .delete(`${API}/blogs/${id}`)
          .then(() => {
            toast.success("Post Removed", {duration: 4000,
              position: 'top-center',
            
              // Styling
              style: {
                background: '#FF5733',
                color: 'white'
              },
              className: '',
            
              // Custom Icon
              icon: <ClearIcon
                style={{
                  color: 'white', 
                  backgroundColor: '#FF5733', 
                  borderRadius: '50%',   
                  padding: '8px',       
                }}
            />,
            
              // Change colors of success/error/loading icon
              iconTheme: {
                primary: '#000',
                secondary: '#fff',
              },
              ariaProps: {
                role: 'status',
                'aria-live': 'polite',
              },
            })
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