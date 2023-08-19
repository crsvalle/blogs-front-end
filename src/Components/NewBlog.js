import { FormControl, FormHelperText, FormLabel, Input, InputLabel } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function NewBlog() {
  let navigate = useNavigate();
  const [blog, setBlog] = useState({
    name: "",
    image: "",
    
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

//   const handleCheckboxChange = () => {
//     setBlog({ ...blog, is_favorite: !blog.is_favorite });
//   };

  const handleSubmit = (event) => {
    event.preventDefault();
    addBlog(blog);
  };
  return (
    <div className="New">
      <FormControl onSubmit={handleSubmit}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input
          id="name"
          value={blog.name}
          type="text"
          onChange={handleTextChange}
          placeholder="Name of Blog"
          required
        />
        <FormLabel htmlFor="image">Image</FormLabel>
        <Input
          id="image"
          type="text"
          pattern="http[s]*://.+"
          value={blog.image}
          placeholder="http://"
          onChange={handleTextChange}
        />


        <br />
        <input type="submit" />
      </FormControl>
    </div>
  );
}

export default NewBlog;