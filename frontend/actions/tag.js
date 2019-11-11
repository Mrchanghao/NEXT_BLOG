import axios from 'axios';
import {API} from '../config'
import Cookie from 'js-cookie';

export const createTag = (tag, token) => {
  return axios.post(`${API}/tag`, tag, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
};

export const getTags = () => {
  return axios.get(`${API}/tags`)
}

export const singleTag = (slug) => {
  return axios.get(`${API}/tag/${slug}`)
}

export const removeTag = (slug, token) => {
  return axios.delete(`${API}/tag/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}