import { useState } from 'react'
import { onLogin } from '../api/auth'
import { useDispatch } from 'react-redux'
import { authenticateUser, updateUserInfo } from '../redux/slices/authSlice'

function Login() {
  const [values, setValues] = useState({
    username: '',
    password: '',
  })
  const [error, setError] = useState(false)

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const dispatch = useDispatch()
  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const user = await onLogin(values);
      console.log('User object:', user); // Check if user contains the expected data
      
      dispatch(authenticateUser());
      console.log('authenticateUser dispatched');
  
      const { id, username } = user;
      console.log('Dispatching updateUserInfo with id:', id, 'and username:', username);
      dispatch(updateUserInfo({ id, username }));
  
      localStorage.setItem('isAuth', true);
      localStorage.setItem('id', id);
      localStorage.setItem('username', username );
      // window.location.reload();

    } catch (error) {
      console.log(error.response.data.errors[0].msg)
      setError(error.response.data.errors[0].msg)
    }
  }

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)} className='container mt-3'>
        <h1>Login</h1>

        <div className='mb-3'>
          <label htmlFor='username' className='form-label'>
            username 
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='username'
            className='form-control'
            id='username'
            name='username'
            value={values.username}
            placeholder='username'
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='password'
            value={values.password}
            className='form-control'
            id='password'
            name='password'
            placeholder='passwod'
            required
          />
        </div>

        <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default Login