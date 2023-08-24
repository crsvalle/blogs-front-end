import { Box, Container, Typography } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';

function Footer() {

  return (
    <Box component="footer" sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container >
        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          <Link color="inherit" to="https://github.com/crsvalle">
            Github
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer