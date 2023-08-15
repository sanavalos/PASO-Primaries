import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_PRIMARIES
})

export const getPrimariesData = () => {
  return apiClient.get('')
}
