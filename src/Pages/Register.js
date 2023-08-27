import { useState } from 'react'
import { onRegistration } from '../api/auth'
import { Box, Container, Paper, TextField, Typography, Button } from '@mui/material';


function Register() {
  const [values, setValues] = useState({
    username: '',
    password: '',
  })
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await onRegistration(values)

      setError('')
      setSuccess(data.message)
      setValues({ username: '', password: '' })
    } catch (error) {
      setError(error.response.data.errors[0].msg)
      setSuccess('')
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  minHeight: '500px' }}>
    <Container component="main" maxWidth="xs" sx={{marginBottom: '200px', marginTop: '100px'}}>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 4 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Register
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
            placeholder="Username"
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
            placeholder="Password"
            required
          />
          <Typography variant="body2" sx={{ color: 'red', marginY: 1 }}>
            {error}
          </Typography>
          <Typography variant="body2" sx={{ color: 'green', marginY: 1 }}>
            {success}
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

export default Register