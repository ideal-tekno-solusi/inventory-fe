import axios from 'axios'

const http = axios.create({
  withCredentials: true,
  baseURL: '/',
  timeout: 10000,
})

export default http
