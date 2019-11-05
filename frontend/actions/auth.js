import axios from 'axios';
import {API} from '../config'
import Cookie from 'js-cookie';


export const signUp = async (user) => {
  return axios.post(`${API}/signup`, user)
    // .then(res => {
    //   console.log(res)
    // })
    // .catch(err => console.log(err))
};

export const signIn = (user) => {
  return axios.post(`${API}/signin`, user)
};

export const signOut = (next) => {
  removeCookie('token');
  removeLocalStorage('user');
  next();

  return axios.get(`${API}/signout`)
}


export const setCookie = (key, value) => {
  
  if(process.browser) {
    // cookie.set(key, value, {
    //   expires: 1
    // })
    Cookie.set(key, value, {expires: 1})
  }
}

export const removeCookie = (key) => {
  if(process.browser) {
    Cookie.remove(key, {
      expires: 1
    })
  }
};

export const getCookie = (key) => {
  if(process.browser) {
    return Cookie.get(key)
  }
}

export const setLocalStorage = (key, value) => {
  if(process.browser) {
    localStorage.setItem(key, JSON.stringify(value))
  }
}

export const removeLocalStorage = (key) => {
  if(process.browser) {
    localStorage.removeItem(key)
  }
};

export const authenticate = (data, next) => {
  setCookie('token', data.token);
  setLocalStorage('user', data.user);
  next();
};

export const isAuth = () => {
  if(process.browser) {
    const cookieCheck = getCookie('token');
    if(cookieCheck) {
      if(localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'))
      } else {
        return false;
      }
    } else {
      // 라우터로 로그인 페이지로 가도록 비동기 콜백함수 실행
      return false;
    }
  }
}

