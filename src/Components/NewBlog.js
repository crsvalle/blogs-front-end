import { Button, FormControl, FormControlLabel, FormLabel, Input, Radio, RadioGroup } from "@mui/material";
import axios from "axios";
import {  useState } from "react";
import {  useNavigate } from "react-router-dom";
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

import './NewBlog.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import toast from 'react-hot-toast';

const API = process.env.REACT_APP_API_URL;

function NewBlog() {
  let navigate = useNavigate();

  const getUsernameFromLocalStorage = () => {
    return localStorage.getItem('username') || 'null'; // Change 'username' to the actual key
};

  const getUserIDFromLocalStorage = () => {
    return localStorage.getItem('id') || 'null'; // Change 'id' to the actual key
  };
  

  let username = getUsernameFromLocalStorage()
  let authorId = getUserIDFromLocalStorage()

  const dat = new Date()
  let currentDay = String(dat.getDate()).padStart(2,'0');
  let currentMonth = String(dat.getMonth() +1).padStart(2,"0");
  let currentYear = dat.getFullYear();
  let currentDate = `${currentMonth}-${currentDay}-${currentYear}`
  


  const [blog, setBlog] = useState({
    author_id: authorId,
    name: "",
    image: "",
    author: username,
    body: "",
    type: "",
    date: currentDate,
  });


  const addBlog = (newBlog) => {
    const authorId = getUserIDFromLocalStorage();
    newBlog.author_id = authorId;
    axios
      .post(`${API}/blogs`, newBlog)
      .then(
        () => {
          toast.success("Post Uploaded", {duration: 4000,
            position: 'top-center',
          
            // Styling
            style: {
              background: 'green',
              color: 'white'
            },
            className: '',
          
            // Custom Icon
            icon: <CheckCircleOutlinedIcon
              style={{
                color: 'white', 
                backgroundColor: 'green', 
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
        },
        (error) => console.error(error)
      )
      .catch((c) => console.warn("catch", c));
  };




  const handleTextChange = (event) => {
    setBlog({ ...blog, [event.target.id]: event.target.value });
  };

  const handleRadioChange = (event) => {
    setBlog({...blog, type: event.target.value})
  }

  const handleBodyChange = (value) =>{
    setBlog({...blog, body: value})
  }


  const handleSubmit = (event) => {
    event.preventDefault()
    addBlog(blog);
  };

  return (
    <form className="new" onSubmit={handleSubmit}>
        <div className="new-form">
            <div className="left-box">
                <FormControl >
                    <FormLabel htmlFor="name"></FormLabel>
                    <FormControl>
                      <Input
                      id="name"
                      value={blog.name}
                      type="text"
                      onChange={handleTextChange}
                      placeholder="Title"
                      required
                      />
                    </FormControl>

                    <br />

                    <FormControl>
                    <FormLabel htmlFor="image"></FormLabel>
                      <Input
                      id="image"
                      type="text"
                      pattern="http[s]*://.+"
                      value={blog.image}
                      placeholder="Image - http://"
                      onChange={handleTextChange}
                      />
                    </FormControl>

                    <br />

                    <FormControl>
                    <FormLabel htmlFor="author"></FormLabel>
                      <Input
                      id="author"
                      type="text"
                      placeholder="Author"
                      value={blog.author}
                      
                      readOnly
                      />
                    </FormControl>
                
                    <br />

                    <FormControl>
                        <FormLabel htmlFor="type"></FormLabel>
                        <RadioGroup
                        name="controlled-radio-buttons-group"
                        onChange={handleRadioChange}
                        value={blog.type}>
                            <FormControlLabel value="General" control={<Radio />} label="General" />
                            <FormControlLabel value="Games" control={<Radio />} label="Games" />
                            <FormControlLabel value="Food" control={<Radio />} label="Food" />
                            <FormControlLabel value="Travel" control={<Radio />} label="Travel" />
                            <FormControlLabel value="Movie" control={<Radio />} label="Movie" />
                        </RadioGroup>
                    </FormControl>
                </FormControl>
                
                <Button type="submit" >submit</Button>
            </div>

            <div className="right-box"> 
                <div>
                    <FormLabel htmlFor="body"></FormLabel>
                       <ReactQuill className="quill" theme="snow" value={blog.body} onChange={handleBodyChange} />
                </div>
            </div>
        </div>

        <br />
    </form>
  );
}

export default NewBlog;
