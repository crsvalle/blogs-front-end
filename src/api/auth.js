import axios from 'axios'
axios.defaults.withCredentials = true

export async function onRegistration(registrationData) {
  return await axios.post(
    'https://blogs-and.onrender.com/users/register',
    registrationData
  )
}

export async function onLogin(loginData) {
    try {
      const response = await axios.post('https://blogs-and.onrender.com/users/login', loginData);
      console.log(response)
      const { id, username } = response.data; // Assuming the data structure is correct
      return { id, username };
    } catch (error) {
      throw error; // Rethrow the error to handle it in the component
    }
  }

export async function onLogout() {
  return await axios.get('https://blogs-and.onrender.com/users/logout')
}

export async function fetchProtectedInfo() {
  return await axios.get('https://blogs-and.onrender.com/users/protected')
}