import React, {useState, useEffect} from 'react';
import {signUp, isAuth} from '../../actions/auth'
import { ShowError, ShowLoading, ShowMessage } from '../Loading';
import Link from 'next/link';
import Router from 'next/router';

const SignupComponent = () => {

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    loading: false,
    showForm: true,
    message: ''
  })

  const {name, email, password, error, loading, message, showForm} = values

  useEffect(() => {

    isAuth() && Router.push('/');


  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    setValues({...values, loading: true, error: false})
    const user = {name, email, password}
    signUp(user)
    .then(res => {
      const {data} = res;
        setValues({...values, name: '', email: '', password: '', 
        showForm: false, 
        loading: false, message: data.message})
      
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



  const SignUpForm = () => {
    return(
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input className='form-control' 
            type='text'
            value={name}
            name={'name'}
            placeholder='Type your name'
            onChange={handleChange} />
        </div>

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
      {showForm && SignUpForm()}
      <div className='mt-2'>
        <p>already have an account? 
          <Link href='/signin'>
            <span 
              style={{cursor: 'pointer'}}
              className='alert-link font-weight-bold text-danger'>  Go to Sign In Page</span>
          </Link>
        </p>
      </div>
    </>
  );
}

export default SignupComponent;
