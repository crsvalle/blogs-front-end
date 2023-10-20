  import axios from "axios";
  import { useState, useEffect } from "react";
  import Comment from "./Comment";
  import CommentNew from "./CommentNew";
  import { Paper } from "@mui/material";
  import { useAutoAnimate } from '@formkit/auto-animate/react'



  const API = process.env.REACT_APP_API_URL;

  function Comments({id}) {
    const [comments, setComments] = useState([]);
const [parent, enableAnimations] = useAutoAnimate()

    function parseDate(dateStr) {
      if (!dateStr || typeof dateStr !== 'string') {
        console.error('Invalid date string:', dateStr);
        return null;
      }
    
      const parts = dateStr.split(/\s+/);
    
      if (parts.length === 1) {
        // Handle the case without time
        const dateParts = parts[0].split('-');
        if (dateParts.length !== 3) {
          console.error('Invalid date format:', dateStr);
          return null;
        }
    
        const year = dateParts[2];
        const month = dateParts[0].padStart(2, '0');
        const day = dateParts[1].padStart(2, '0');
        const timePart = "00:00:00";
    
        return `${month}-${day}-${year} ${timePart}`;
      } else if (parts.length === 2) {
        // Handle the case with time
        const datePart = parts[0];
        const timePart = parts[1];
    
        const dateParts = datePart.split('-');
        if (dateParts.length !== 3) {
          console.error('Invalid date format:', dateStr);
          return null;
        }
    
        const year = dateParts[2];
        const month = dateParts[0].padStart(2, '0');
        const day = dateParts[1].padStart(2, '0');
    
        return `${month}-${day}-${year} ${timePart}`;
      } else {
        console.error('Invalid date format:', dateStr);
        return null;
      }
    }
    
  

    useEffect(() => {
      async function fetchComments() {
        try {
          const response = await axios.get(`${API}/blogs/${id}/comments`);
          const commentsWithParsedDate = response.data.map((comment) => ({
            ...comment,
            parsedDate: parseDate(comment.date),
          }));
    
          const sortedComments = commentsWithParsedDate.sort((a, b) =>
            b.parsedDate.localeCompare(a.parsedDate)
          );
    
          setComments(sortedComments);
        } catch (error) {
          console.error("Error fetching comments:", error);
        }
      }
    
      fetchComments();
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
        <Paper style={{}} ref={parent}>
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