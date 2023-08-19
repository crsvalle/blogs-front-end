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
        <Button className="item">
          <Link className="link" to='/'>
            <HomeIcon sx={{mr:0.5}} fontSize='inherit'/> Home
          </Link>
        </Button>
        <Button className="navButton">
            <Link className="link" to="/blogs/new">New blog</Link>
        </Button>
        <Button className="item">
          <Link className="link" to="/blogs">More blogs</Link>
        </Button>
      </Breadcrumbs>

      <div>
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