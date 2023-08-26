import axios from 'axios'
axios.defaults.withCredentials = true

export async function onRegistration(registrationData) {
  return await axios.post(
    'http://localhost:3003/users/register',
    registrationData
  )
}

export async function onLogin(loginData) {
  return await axios.post('http://localhost:3003/users/login', loginData)
}

export async function onLogout() {
  return await axios.get('http://localhost:3003/users/logout')
}

export async function fetchProtectedInfo() {
  return await axios.get('http://localhost:3003/users/protected')
}