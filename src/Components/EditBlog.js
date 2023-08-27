import { Button, FormControl, FormControlLabel, FormLabel, Input, Radio, RadioGroup } from "@mui/material";


import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

const API = process.env.REACT_APP_API_URL;
const getUserIDFromLocalStorage = () => {
  return localStorage.getItem('id') || 'null'; // Change 'id' to the actual key
};

const userId = getUserIDFromLocalStorage()


function EditBlog() {
    let { index } = useParams();
    let navigate = useNavigate();
    
    const [blog, setBlog] = useState({
        name: "",
        image: "",
        author: "",
        body: "",
        type: ""
      });

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
    
      const updateBlog = (updatedBlog) => {
        axios
          .put(`${API}/blogs/${index}`, updatedBlog)
          .then((response) => {
            setBlog(response.data);
            navigate(`/blogs/${index}`);
          })
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
        updateBlog(blog);
      };
    
  return (
    <>

    {blog.author_id + '' === userId ? (
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
                      value={blog.author}
                      placeholder="Author"
                      onChange={handleTextChange}
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
                    <ReactQuill className="quill" theme="snow" value={blog.body} onChange={handleBodyChange} />

                  </div>
              </div>
          </div>

          <br />
      </form>)
      :
      "Nothing to find here"

    }
    </>
  )
}

export default EditBlog