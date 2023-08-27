import { Grid } from "@mui/material";
import './Comment.css'

function Comment({ comment, handleDelete }) {

    return (
        <Grid container wrap="nowrap"  className="comment">
            {/* <Grid>
                user image/avatar here soon
            </Grid> */}
            <Grid justifyContent={"left"} item xs zeroMinWidth >
                    <h5 style={{margin:0}}>{comment.name}</h5>
                    <p style={{fontSize:"14px"}}>{comment.content}</p>
                    <p style={{color:'grey', fontSize:"12px"}}>posted on {comment.date}</p>
            </Grid>
       
        <div className="deletButton">
            <div></div>
            <button style={{margin:"auto"}} onClick={() => handleDelete(comment.id)}>delete</button>
            <div></div>
        </div>
        </Grid>
        );
  }
  
  export default Comment;