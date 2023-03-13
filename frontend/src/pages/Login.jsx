import React, { useEffect, useState } from 'react';
import axios from '../axiosInstance';
import { useNavigation, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BiEnvelope, BiLock } from 'react-icon/bi';
import './Login.css';

function Login() {
  const navigation = useNavigation();
  const [values, setValues] = useState({ userName: '', password: '' });
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    them: 'dark',
  };
  useEffect(() => {
    if (localStorage.getItem('devChatUser')) {
      navigation.navigate('/');
    }
  });
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.values });
  };
  const ValidationForm = () => {
    const { email, password } = values;
    if (email === '') {
      toast.error('Email and password is required', toastOptions);
      return false;
    } else if (password === '') {
      toast.error('Email and password is required', toastOptions);
      return false;
    }
    return true;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (ValidationForm()) {
      const { email, password } = values;
      axios
        .post('./login', { email, password })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem('devChatUser', JSON.stringify(res.data.token));
          navigation.navigate('/');
        })
        .catch((err) => {
          console.log(err.res.data);
          toast.error(err.res.data.message, toastOptions);
        });
    }
  };
  return (
    <>
      <div className='body'>
        <div className='container'>
          <div className='WebChat'>
            <h1>DevChat</h1>
          </div>
          <div className='forms'>
            <div className='form login'>
              <span className='title'>Login</span>

              <form action='' onSubmit={(event) => handleSubmit(event)}>
                <div className='input-field'>
                  <input
                    type='text'
                    placeholder='Enter your email'
                    required
                    name='email'
                    onChange={(e) => handleChange(e)}
                    min='3'
                  />
                  <i className='icon'>
                    <BiEnvelope />
                  </i>
                </div>

                <div className='input-field'>
                  <input
                    type='password'
                    placeholder='Enter your password'
                    required
                    name='password'
                    onChange={(e) => handleChange(e)}
                  />
                  <i className='icon'>
                    <BiLock />
                  </i>
                </div>

                <div className='btn'>
                  <button type='submit'>Login</button>
                </div>
              </form>

              <div className='login-signup'>
                <span className='text'>
                  Not a member?{'   '}
                  <Link to='/register' className='signup-text'>
                    Signup
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
