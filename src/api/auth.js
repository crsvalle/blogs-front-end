import axios from 'axios'
const API = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true

export async function onRegistration(registrationData) {
  return await axios.post(
    `${API}/users/register`,
    registrationData
  )
}

export async function onLogin(loginData) {
    try {
      const response = await axios.post(`${API}/users/login`, loginData);
      console.log(response)
      const { id, username } = response.data; // Assuming the data structure is correct
      return { id, username };
    } catch (error) {
      throw error; // Rethrow the error to handle it in the component
    }
  }

export async function onLogout() {
  return await axios.get(`${API}/users/logout`)
}

export async function fetchProtectedInfo() {
  return await axios.get(`${API}/users/protected`)
}