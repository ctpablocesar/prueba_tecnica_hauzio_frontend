import axios from 'axios'
const apiURL = import.meta.env.VITE_API_URL

if (apiURL == null) {
  throw new Error('API URL is not defined')
}

const axiosInstance = axios.create({
  baseURL: `${apiURL}/api`,
  timeout: 2000
})

const setToken = (config) => {
  const token = localStorage.getItem('token')
  if (token != null && config.headers !== undefined) {
    config.headers['x-token'] = `${token}`
  }
  return config
}

axiosInstance.interceptors.request.use(
  (config) => setToken(config),
  async (error) => await Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('token')
      window.location.reload()
    }
    return await Promise.reject(error)
  }
)

export default axiosInstance
