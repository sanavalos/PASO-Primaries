import axios from 'axios'

const apiClientBackend = axios.create({
  baseURL: import.meta.env.VITE_API_PRIMARIES
})

const apiClientColors = axios.create({
  baseURL: import.meta.env.VITE_API_COLORS
})

export const getPrimariesData = () => {
  return apiClientBackend.get('')
}

export const getColorsData = () => {
  return apiClientColors.get('')
}
