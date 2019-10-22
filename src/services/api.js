import axios from 'axios'

const api = axios.create({
	baseURL: 'https://backend-gitfriendly.herokuapp.com/',
})

export default api
