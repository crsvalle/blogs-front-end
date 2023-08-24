import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function SearchBar() {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e){
    e.preventDefault();
    navigate(`/search/${input}`)
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input name={`search`} placeholder='Search...' onChange={e => setInput(e.target.value)} value={input}/>
            <button>Search</button>
        </form>
    </div>
  )
}

export default SearchBar