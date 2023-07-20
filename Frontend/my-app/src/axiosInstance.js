import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: "http://localhost:9000",
    headers: {
        'Content-Type': 'application/json', // Set common headers if needed
      },
})

export default axiosInstance;