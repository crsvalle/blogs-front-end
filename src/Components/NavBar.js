import { Link } from 'react-router-dom'

import './NavBar.css'
import { Breadcrumbs, Button, Menu, MenuItem } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import { useState } from 'react'

function NavBar() {
  const [anchorEle, setAnchorEle] = useState(null);
  const open = Boolean(anchorEle);

  function handleClick (event){
    setAnchorEle(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEle(null);
  }
   return (
    <nav role='prensentation'>
      <Breadcrumbs className="navItems"> 
          <Link className="link" to='/'>
            <HomeIcon sx={{mr:0.5}} fontSize='inherit'/> HOME
          </Link>
            <Link className="link" to="/blogs/new">NEW BLOG</Link>
          <Link className="link" to="/blogs">MORE BLOGS</Link>
      </Breadcrumbs>

      <div className='dashboard'>
        <Button id='basic-button'
        style={{color:"black"}}
        aria-controls={open ? 'basic-menu': undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        >
          Dashboard
        </Button>
        <Menu id='basic-menu'
        anchorEl={anchorEle}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
          <MenuItem onClick={handleClose}>Profile </MenuItem>
          <MenuItem onClick={handleClose}>My Account</MenuItem>
          <MenuItem onClick={handleClose}>Log out</MenuItem>
        </Menu>
      </div>

    </nav>
  )
}

export default NavBar