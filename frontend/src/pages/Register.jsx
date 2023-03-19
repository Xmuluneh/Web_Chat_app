import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from './axiosInstanc';
import { Avatar, Image } from 'antd';
import 'antd/dist/antd.css';
import { UserOutlined } from '@ant-design/icons';
function Register() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('decChatUser')) {
      navigate('/');
    }
  }, []);

  const avatars = [
    'julie',
    'jane',
    'jocelyn',
    'jai',
    'josh',
    'jon',
    'jerry',
    'jed',
    'jordan',
    'jezebel',
    'jacqueline',
    'jeri',
    'james',
    'jia',
    'jana',
    'jude',
    'josephine',
    'joe',
    'jennie',
    'jodi',
    'jean',
    'jolene',
    'jack',
    'jeans',
    'jake',
    'jabala',
    'jacques',
    'jess',
  ];
  const [images, setImage] = useEffect(
    `https://joeschome.io/api/v1${
      avatars[Math.floor(Math.random() * avatars.length)]
    }`
  );
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatars: images,
  });
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    them: 'dark',
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { firstName, lastName, password, userName, email } = values;

      const user = {
        firstName,
        lastName,
        password,
        userName,
        email,
        avatars: images,
      };
      console.log(user);
      axios.post('/register', user).then(
        ((response) => {
          console.log(response.data);
          navigate('/login');
        }).catch((err) => {
          console.log(err.response.data);
          toast.error(err.response.data, toastOptions);
        })
      );
    }

    const handleValidation = () => {
      const {
        password,
        confirmPassword,
        userName,
        email,
        firstName,
        lastName,
      } = values;
      if (password !== confirmPassword) {
        toast.error('password should be the same', toastOptions);
        return false;
      } else if (userName.length < 3) {
        toast.error(
          'username should be greater than 3 characters',
          toastOptions
        );
        return false;
      } else if (password.length < 8) {
        toast.error(
          'password should be equal to or greater than 8 characters',
          toastOptions
        );
        return false;
      } else if (email === '') {
        toast.error('email is required', toastOptions);
        return false;
      } else if (firstName === '') {
        toast.error('firstName is required', toastOptions);
      } else if (lastName === '') {
        toast.error('lastName is required', toastOptions);
      }
      return true;
    };
    const handleChange = (event) => {
      setValues({ ...values, [event.target.name]: event.target.value });
    };
    return (
      <>
        <FormContainer>
          <div className='body'>
            <div className='container'>
              <header>Signup</header>

              <form onSubmit={(event) => handleSubmit(event)}>
                <div className='form first'>
                  <div className='details personal'>
                    <span className='title'>Identity Detail</span>

                    <div className='fields'>
                      <div className='input-field'>
                        <label>First Name *</label>
                        <input
                          type='text'
                          placeholder='Enter your first name'
                          required
                          name='firstName'
                          onChange={(e) => handleChange(e)}
                        />
                      </div>

                      <div className='input-field'>
                        <label>Last Name *</label>
                        <input
                          type='text'
                          placeholder='Enter your last name'
                          required
                          name='lastName'
                          onChange={(e) => handleChange(e)}
                        />
                      </div>

                      <div className='input-field'>
                        <label>Email *</label>
                        <input
                          type='email'
                          placeholder='Enter your email'
                          required
                          name='email'
                          onChange={(e) => handleChange(e)}
                        />
                      </div>

                      <div className='input-field'>
                        <label>Password *</label>
                        <input
                          type='password'
                          placeholder='Enter your password'
                          required
                          name='password'
                          onChange={(e) => handleChange(e)}
                        />
                      </div>

                      <div className='input-field'>
                        <label>Confirm Password *</label>
                        <input
                          type='password'
                          placeholder='Confirm password'
                          required
                          name='confirmPassword'
                          onChange={(e) => handleChange(e)}
                        />
                      </div>

                      <div className='input-field'>
                        <label>User Name *</label>
                        <input
                          type='text'
                          placeholder='Enter your user name'
                          required
                          name='userName'
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className='details ID'>
                    <span className='title'>Personal Detail</span>

                    <div className='fields'>
                      <div className='input-field'>
                        <label>Github *</label>
                        <input
                          type='text'
                          placeholder='Enter your github account'
                          required
                          name='github'
                          onChange={(e) => handleChange(e)}
                        />
                      </div>

                      <div className='input-field'>
                        <label>LinkedIn</label>
                        <input
                          type='text'
                          placeholder='Enter your linkedIn account'
                          name='linkedIn'
                          onChange={(e) => handleChange(e)}
                        />
                      </div>

                      <div className='input-field'>
                        <label>Experience *</label>
                        <input
                          type='text'
                          placeholder='Enter your experience'
                          required
                          name='experience'
                          onChange={(e) => handleChange(e)}
                        />
                      </div>

                      <div className='input-field'>
                        <label>Specialization *</label>
                        <input
                          type='text'
                          placeholder='Enter your specialization'
                          required
                          name='title'
                          onChange={(e) => handleChange(e)}
                        />
                      </div>

                      <div className='input-field'>
                        <label>Country *</label>
                        <input
                          type='text'
                          placeholder='Enter your country'
                          required
                          name='country'
                          onChange={(e) => handleChange(e)}
                        />
                      </div>

                      <div className='input-field'>
                        <label>City *</label>
                        <input
                          type='text'
                          placeholder='Enter your city'
                          required
                          name='city'
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='form second'>
                  <div className='details address'>
                    <span className='title'>Avatar</span>

                    <div className='fields'>
                      <div className='input-fields'>
                        <div className='avatar'>
                          <Avatar
                            size={{
                              xs: 24,
                              sm: 32,
                              md: 40,
                              lg: 64,
                              xl: 80,
                              xxl: 100,
                            }}
                            icon={<UserOutlined />}
                            src={<Image src={images} />}
                          />
                        </div>
                        <input
                          type='button'
                          className='picbtn'
                          name='photo'
                          value='New'
                          onClick={(e) => inputChange(e)}
                        />
                      </div>
                    </div>

                    <div className='btn'>
                      <button type='submit'>Signup</button>
                    </div>
                  </div>
                </div>
              </form>

              <div className='login-signup'>
                <span className='text'>
                  Already a member?{'   '}
                  <Link to='/login' className='login-text'>
                    Login
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </FormContainer>
        <ToastContainer />
      </>
    );
  };
}

const FormContainer = styled.div`
  .body {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #eef2f7;
  }

  .container {
    position: relative;
    max-width: 900px;
    width: 100%;
    border-radius: 6px;
    padding: 30px;
    margin: 0 15px;
    background-color: #fff;
    box-shadow: 0 5px 10px 2px rgba(0, 0, 0, 0.2);
  }

  .container header {
    position: relative;
    font-size: 20px;
    font-weight: 600;
    color: #333;
  }

  .container header::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    height: 3px;
    width: 27px;
    border-radius: 8px;
    background-color: #4070f4;
  }

  .container form {
    position: relative;
    margin-top: 16px;
    min-height: 490px;
    background-color: #fff;
  }

  .container form .details {
    margin-top: 30px;
  }

  .container form .details.ID {
    margin-top: 10px;
  }

  .container form .title {
    display: block;
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: 500;
    margin: 6px 0;
    color: #333;
  }

  .container form .fields {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  form .fields .input-field {
    display: flex;
    flex-direction: column;
    width: calc(100% / 3 - 15px);
    margin: 4px 0;
  }

  .input-field label {
    font-size: 12px;
    font-weight: 500;
    color: #2e2e2e;
  }

  .input-field input {
    height: 42px;
    margin: 8px 0;
    padding: 0 15px;
    border: 1px solid #aaa;
    border-radius: 5px;
    outline: none;
    font-size: 14px;
    font-weight: 400;
    color: #333;
  }

  .input-field input:is(:focus, :valid) {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.13);
  }

  .container form button {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 45px;
    max-width: 200px;
    width: 100%;
    background-color: #4070f4;
    border: none;
    outline: none;
    color: #fff;
    border-radius: 5px;
    margin: 25px 0;
    transition: all 0.3s linear;
    cursor: pointer;
  }

  form button:hover {
    background-color: #265df2;
  }

  form button i {
    margin: 0 6px;
  }

  .avatar {
    margin-bottom: 20px;
  }

  .form .btn {
    margin-top: 30px;
  }

  .form .btn button {
    position: relative;
    height: 50px;
    width: 50%;
    margin-top: 20px;
    margin-left: 39%;
    border: none;
    color: #fff;
    font-size: 17px;
    font-weight: 500;
    letter-spacing: 1px;
    border-radius: 6px;
    background-color: #4070f4;
    transition: all 0.3s ease;
  }

  .btn button:hover {
    background-color: #265df2;
  }

  .form .picbtn {
    margin-top: 30px;
  }

  .form .picbtn {
    margin-top: 1px;
    padding: 5px 10px 5px;
    margin-left: 20%;
    border: none;
    color: #fff;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 1px;
    border-radius: 6px;
    background-color: #4070f4;
    transition: all 0.3s ease;
  }

  .picbtn:hover {
    background-color: #265df2;
    cursor: pointer;
  }

  .login-signup {
    margin-top: 25px;
    text-align: center;
  }

  .login-text {
    font-size: 14px;
    color: #4070f4;
    text-decoration: none;
  }

  .login-text:hover {
    text-decoration: underline;
  }
`;

export default Register;
