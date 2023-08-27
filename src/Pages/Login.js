import { useState } from 'react'
import { onLogin } from '../api/auth'
import { useDispatch } from 'react-redux'
import { authenticateUser, updateUserInfo } from '../redux/slices/authSlice'
import {  useNavigate } from 'react-router-dom'
import { Box, Container, Paper, TextField, Typography, Button } from '@mui/material';

function Login() {
  const [values, setValues] = useState({
    username: '',
    password: '',
  })
  const [error, setError] = useState(false)

  let navigate = useNavigate()
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const dispatch = useDispatch()
  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const user = await onLogin(values);
      console.log('User object:', user);
      
      const { id, username } = user;
      
      
      dispatch(authenticateUser());
      dispatch(updateUserInfo({ id, username }));
  
      localStorage.setItem('isAuth', JSON.stringify(true));
      localStorage.setItem('id', id);
      localStorage.setItem('username', username );
      navigate('/')

    } catch (error) {
      console.log(error.response.data.errors[0].msg)
      setError(error.response.data.errors[0].msg)
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '500px' }}>
        <Container component="main" maxWidth="xs"sx={{marginBottom: '200px', marginTop: '100px'}}>
          <Paper elevation={3} sx={{ padding: 3, borderRadius: 4 }}>
            <Typography variant="h5" align="center" gutterBottom>
              Login
            </Typography>
            <form onSubmit={(e) => onSubmit(e)}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                name="username"
                value={values.username}
                onChange={(e) => onChange(e)}
                required
              />
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                name="password"
                value={values.password}
                onChange={(e) => onChange(e)}
                required
              />
              <Typography variant="body2" sx={{ color: 'red', marginY: 1 }}>
                {error}
              </Typography>
              <Button variant="contained" color="primary" fullWidth type="submit">
                Submit
              </Button>
            </form>
          </Paper>
        </Container>
      </Box>
  )
}

export default Login