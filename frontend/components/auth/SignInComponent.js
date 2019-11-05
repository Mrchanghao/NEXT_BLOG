import React, {useState, useEffect} from 'react';
import {signIn, authenticate, isAuth} from '../../actions/auth'
import { ShowError, ShowLoading, ShowMessage } from '../Loading';
import Router from 'next/router';

const SignInComponent = () => {

  const [values, setValues] = useState({
  
    email: '',
    password: '',
    error: '',
    loading: false,
    showForm: true,
    message: ''
  })

  const {email, password, error, loading, message, showForm} = values

  useEffect(() => {

    isAuth() && Router.push('/');


  }, [])


  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({...values, loading: true, error: false})
    const user = {email, password}
    signIn(user)
    .then(res => {
      const {data} = res;
      
      authenticate(data, () => {
        
        Router.push('/')
      })
  
    })
    .catch(err => {
      setValues({...values, error: err.message, loading: false})
      console.log(err)
    })
    // console.table({name, email, password})
    // async await 로 리팩토링 해야함
  };

  const handleChange = (e) => {

    setValues({
      ...values,
      error: false,
      [e.target.name]: e.target.value
    })
    // console.log(e.target.value)
  }



  const SignInForm = () => {
    return(
      <form onSubmit={handleSubmit}>

        <div className='form-group'>
          <input className='form-control' 
            type='email'
            name={'email'}
            value={email}
            placeholder='Type your email'
            onChange={handleChange} />
        </div>

        <div className='form-group'>
          <input className='form-control' 
            type='password'
            name={'password'}
            value={password}
            placeholder='Type your password'
            onChange={handleChange} />
        </div>
        <div>
          <button className='btn btn-primary'>SUBMIT</button>
        </div>
      </form>
    )
  }



  return (
    <>
      <ShowError error={error} />
      <ShowLoading loading={loading} />
      <ShowMessage message={message} />
      {showForm && SignInForm()}
    </>
  );
}

export default SignInComponent;
