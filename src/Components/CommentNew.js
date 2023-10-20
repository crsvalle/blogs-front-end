import { useState } from "react";
import './CommentNewForm.css'
import { useSelector } from "react-redux";



function CommentNew({addComment, id}) {
    
    const { isAuth} = useSelector((state) => state.auth)

  const username = localStorage.getItem('username') || 'No Username';
  const userId = localStorage.getItem('id') || '';
  

  const dat = new Date()
  let currentDay = String(dat.getDate()).padStart(2, '0');
  let currentMonth = String(dat.getMonth() + 1).padStart(2, '0');
  let currentYear = dat.getFullYear();
  let hours = dat.getHours();


  hours = hours % 12 || 12; 
  let time = `${hours}:${dat.getMinutes()}:${dat.getSeconds()}`;
  let currentDate = `${currentMonth}-${currentDay}-${currentYear}`;
  let currentTime = `${currentDate} ${time}`;

  
  const [comment, setComment] = useState({
    blog_id: id,
    author_id: userId, 
    name: username,
    content: '',
    date: currentTime,
  })
  

  function clearForm(){
    setComment({
        blog_id: id, 
        name: username,
        author_id:userId,
        content: '',
        date: currentTime,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    addComment(comment);
    clearForm()
  };

  const handleTextChange = (event) => {
    setComment({ ...comment, [event.target.id]: event.target.value });
  };


  return (
    <div className="">
        {isAuth ? 
            <form className="commentForm" onSubmit={handleSubmit}>
            <div className="nameForm">
                <label htmlFor="name"></label>
                <input
                className="nameInput"
                id="name"
                value={comment.name}
                type="text"
                onChange={handleTextChange}
                placeholder="Username"
                readOnly
                />
            </div> 

            <div className="contentForm"> 
                <label htmlFor="content"></label>
                <input
                id="content"
                className="contentInput"
                value={comment.content}
                type="comment"
                onChange={handleTextChange}
                placeholder="Write what you think..."
                required
                />
                <div>
                    <input className="commentSubmit"type="submit" value="Comment"/>
                </div>
            </div>


            <br />
            </form>
        
        :
        <form className="commentForm" onSubmit={handleSubmit}>
        <div className="nameForm">
            <label htmlFor="name"></label>
            <input
            className="nameInput"
            id="name"
            value={comment.name}
            type="text"
            onChange={handleTextChange}
            placeholder="Username"
            readOnly
            />
        </div> 

        <div className="contentForm"> 
            <label htmlFor="content"></label>
            <input
            id="content"
            className="contentInput"
            value={comment.content}
            type="comment"
            onChange={handleTextChange}
            placeholder="Not logged in"
            required
            />
            <div>
                <input className="commentSubmit"type="submit" value="Disabled" disabled={!isAuth}/>
            </div>
        </div>


        <br />
        </form>}
    </div>
  );
}

export default CommentNew

