  import axios from "axios";
  import { useState, useEffect } from "react";
  import Comment from "./Comment";
  import CommentNew from "./CommentNew";
  import { Paper } from "@mui/material";


  const API = process.env.REACT_APP_API_URL;

  function Comments({id}) {
    const [comments, setComments] = useState([]);


    function parseDate(dateStr) {
      if (!dateStr || typeof dateStr !== 'string') {
        console.error('Invalid date string:', dateStr);
        return null;
      }
    
      const parts = dateStr.split(' +');
      
      if (parts.length === 2) {

        return parts[0] + " +-" + parts[1];
      } else if (parts.length === 1) {
        const dateParts = parts[0].split('-');
        if (dateParts.length !== 3) {
          console.error('Invalid date format:', dateStr);
          return null;
        }
    
        const year = dateParts[2];
        const month = dateParts[0].padStart(2, '0');
        const day = dateParts[1].padStart(2, '0');

        const timePart = "00:00:00";
    
        return `${month}-${day}-${year} +-${timePart}`;
      } else {
        console.error('Invalid date format:', dateStr);
        return null;
      }
    }
  

    useEffect(() => {
      axios.get(`${API}/blogs/${id}/comments`).then((response) => {
        const sortedComments = response.data.sort((a, b) => {
          const dateA = parseDate(a.date);
          const dateB = parseDate(b.date);
          return dateB.localeCompare(dateA); // Use localeCompare for string comparison
        });
        setComments(sortedComments);
      });
    }, [id]);
    


    const addComment = (newComment) => {
      axios
        .post(`${API}/blogs/${id}/comments`, newComment)
        .then(
          (response) => {
            setComments([response.data, ...comments]);
          },
          (error) => console.error(error)
        )
        .catch((c) => console.warn("catch", c));
    };

    const handleDelete = (id) => {
      axios
        .delete(`${API}/blogs/${id}/comments/${id}`)
        .then(
          () => {
            const copyCommentArray = [...comments];
            const indexDeletedComment = copyCommentArray.findIndex((comment) => {
              return comment.id === id;
            });
            copyCommentArray.splice(indexDeletedComment, 1);
            setComments(copyCommentArray);
          },
          (error) => console.error(error)
        )
        .catch((c) => console.warn("catch", c));
    };

    const handleEdit = (updatedComment) => {
      axios
        .put(`${API}/blogs/${id}/comments/${updatedComment.id}`, updatedComment)
        .then((response) => {
          const copyCommentArray = [...comments];
          const indexUpdatedComment = copyCommentArray.findIndex((comment) => {
            return comment.id === updatedComment.id;
          });
          copyCommentArray[indexUpdatedComment] = response.data;
          setComments(copyCommentArray);
        })
        .catch((c) => console.warn("catch", c));
    };

    return (
      <section className="comments">
        <h3>Comments</h3>

        <CommentNew key={id} id={id} addComment={addComment}>
        </CommentNew>
        <Paper style={{}}>
          {comments.map((comment) => (
              <Comment
                  key={comment.id}
                  comment={comment}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
              />
          ))}

        </Paper>
      </section>
    );
  }

  export default Comments;