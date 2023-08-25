import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

import './SearchBar.css'

function Search() {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  function handleSubmit (e){
    e.preventDefault();
    navigate(`/search/${input}`)
  }


  return (
    <div>
        <form className='searchInput' onSubmit={handleSubmit}>
            <input name={`search`} placeholder='Search for a blog' onChange={e => setInput(e.target.value)} value={input}/>
              <Link to={`/search/${input}`}>
                <SearchIcon className='inputButton'/>
              </Link>
        </form>
    </div>
  )
}

export default Search