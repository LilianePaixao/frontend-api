import axios from "axios"

export const api = axios.create({
  baseURL: "https://rocketnotes-api-rwp8.onrender.com"
})

