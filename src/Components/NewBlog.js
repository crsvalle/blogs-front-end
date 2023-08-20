import { Button, FormControl, FormControlLabel, FormHelperText, FormLabel, Input, InputLabel, Radio, RadioGroup, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import './NewBlog.css'



const API = process.env.REACT_APP_API_URL;

function NewBlog() {
  let navigate = useNavigate();

  const [value, setValue] = useState('');

  const [blog, setBlog] = useState({
    name: "",
    image: "",
    author: "",
    body: "",
    type: ""
  });


  

  const addBlog = (newBlog) => {
    axios
      .post(`${API}/blogs`, newBlog)
      .then(
        () => {
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


//   const handleCheckboxChange = () => {
//     setBlog({ ...blog, is_favorite: !blog.is_favorite });
//   };



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
                            <FormControlLabel value="general" control={<Radio />} label="General" />
                            <FormControlLabel value="games" control={<Radio />} label="Games" />
                            <FormControlLabel value="food" control={<Radio />} label="Food" />
                            <FormControlLabel value="travel" control={<Radio />} label="Travel" />
                            <FormControlLabel value="movie" control={<Radio />} label="Movie" />
                        </RadioGroup>
                    </FormControl>
                </FormControl>
                
                <Button type="submit" >submit</Button>
            </div>

            <div className="right-box"> 
                <div>
                    <FormLabel htmlFor="body"></FormLabel>
                        <textarea
                        className="boxOfText"
                        type="text"
                        id="body"
                        value={blog.body}
                        onChange={handleTextChange}
                        placeholder="Write your text here"
                        style={{maxHeight:"400px", maxWidth:"450px"}}/>

                </div>
            </div>
        </div>

        <br />
    </form>
  );
}

export default NewBlog;


// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css'
{/* <ReactQuill theme="snow" value={value} onChange={setValue} /> */}