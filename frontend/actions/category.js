import axios from 'axios';
import {API} from '../config'
import Cookie from 'js-cookie';

export const createCategory = (category, token) => {
  return axios.post(`${API}/category`, category, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
};

export const getCategories = () => {
  return axios.get(`${API}/categories`)
}

export const singleCategory = (slug) => {
  return axios.get(`${API}/category/${slug}`)
}

export const removeCategory = (slug, token) => {
  return axios.delete(`${API}/category/${slug}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
}