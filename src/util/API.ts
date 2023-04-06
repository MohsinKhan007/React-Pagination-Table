import { Buffer } from 'buffer'
import axios from 'axios'
export const API = axios.create({
  baseURL:
    'http://localhost:4000/https://api-sandbox.mysitoo.com/v2/accounts/90316/sites/1/',
  headers: {
    Authorization:
      'Basic ' +
      Buffer.from(
        '90316-125:pfX0Y7A2TYAlZ571IKEO7AKoXza6YlvsP8kKvAu3'
      ).toString('base64'),
    'Content-Type': 'application/json',
  },
})
