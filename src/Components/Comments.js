import axios from "axios";
import { useState, useEffect } from "react";
import Comment from "./Comment";
import CommentNew from "./CommentNew";
import { Paper } from "@mui/material";

const API = process.env.REACT_APP_API_URL;

function Comments({id}) {
  const [comments, setComments] = useState([]);


  useEffect(() => {
    axios.get(`${API}/blogs/${id}/comments`).then((response) => {
      console.log(id);
      setComments(response.data);
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
        (response) => {
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

//   const handleEdit = (updatedComment) => {
//     axios
//       .put(`${API}/blogs/${id}/comments/${updatedComment.id}`, updatedComment)
//       .then((response) => {
//         const copyCommentArray = [...comments];
//         const indexUpdatedComment = copyCommentArray.findIndex((comment) => {
//           return comment.id === updatedComment.id;
//         });
//         copyCommentArray[indexUpdatedComment] = response.data;
//         setComments(copyCommentArray);
//       })
//       .catch((c) => console.warn("catch", c));
//   };

  return (
    <section className="comments">
      <h2>Comments</h2>

      <CommentNew key={id} id={id} addComment={addComment}>
      </CommentNew>
      <Paper style={{}}>
        {comments.map((comment) => (
            <Comment
                key={comment.id}
                comment={comment}
                handleDelete={handleDelete}
            />
        ))}

      </Paper>
    </section>
  );
}

export default Comments;