import { Grid } from "@mui/material";
import './Comment.css'
import { useState } from "react";

function Comment({ comment, handleDelete, handleEdit }) {

    const dat = new Date()
    let currentDay = String(dat.getDate()).padStart(2,'0');
    let currentMonth = String(dat.getMonth() +1).padStart(2,"0");
    let currentYear = dat.getFullYear();
    let time = (dat.getHours() - 12) + ":" + dat.getMinutes() + ":" + dat.getSeconds();
    let currentDate = `${currentMonth}-${currentDay}-${currentYear}`  
  
    let currentTime = `${currentDate}  +${time}`


    const [editing, setEditing] = useState(false);
    const [editedContent, setEditedContent] = useState({

        id: comment.id,
        blog_id: comment.blog_id,
        author_id: comment.author_id,
        name: comment.name,
        date:  currentTime,
        content:comment.content});


    let userId;
    const getUserIDFromLocalStorage = () => {
      return localStorage.getItem('id') || 'null'; 
    };
    userId = getUserIDFromLocalStorage();

    const handleTextChange = (event) => {
        setEditedContent({ ...editedContent, [event.target.id]: event.target.value });
    }

    const startEditing = () => {
        setEditing(true);
    };

    const cancelEditing = () => {
        setEditing(false);
        setEditedContent((prevEditedContent) => ({
            ...prevEditedContent,
            content: comment.content
        }));
    };

    const saveEditedComment = (editedContent) => {
        handleEdit(editedContent)
        setEditing(false);
    };

    return (
        <Grid container wrap="nowrap"  className="comment">
            {/* <Grid>
                user image/avatar here soon
            </Grid> */}
            <Grid justifyContent={"left"} item xs zeroMinWidth >
                    <h5 style={{margin:0}}>{comment.name}</h5>
                    {editing ? (

                    <textarea
                        id="content"
                        style={{minWidth:'90%', maxWidth:'90%', minHeight:'50px', maxHeight:'50px', padding:'4px'}}
                        value={editedContent.content}
                        onChange={handleTextChange}
                    />
                ) : (
                    <p style={{ fontSize: "14px" }}>{comment.content}</p>
                )}
                <p style={{ color: 'grey', fontSize: "12px" }}>posted on {comment.date}</p>
            </Grid>
       
       {comment.author_id +'' === userId ?
         <div className="deletButton">
            {editing ? 
            (<><div></div>
                <button style={{ margin:'auto' ,marginRight:"10px"}} onClick={() => saveEditedComment(editedContent)}>save</button>
                <button style={{margin:"auto"}} onClick={() => cancelEditing(comment.content)}>cancel</button>
            <div></div> </>)
                :
            (<>
            <div></div>
                <button style={{ margin:'auto' ,marginRight:"10px"}} onClick={startEditing}>edit</button>
                <button style={{margin:"auto"}} onClick={() => handleDelete(comment.id)}>delete</button>
            <div></div></>)}
        </div> : ""
       }
        </Grid>
        );
  }
  
  export default Comment;