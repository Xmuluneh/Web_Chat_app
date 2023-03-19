import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  BiUser,
  BiLock,
  BiEnvelope,
  BiNetworkChart,
  BiWorld,
  BiLockOpen,
  BiSearch,
  BiChat,
  BiLogOutCircle,
} from 'react-icons/bi';
import { DiGithubBadge } from 'react-icons/di';
import { FaCity } from 'react-icons/fa';
import { AiFillLinkedin, AiFillExperiment } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../axiosInstance';
import './Chat.css';
import './Welcome.css';
import { BsKeyboard } from 'react-icons/bs';
import Logout from '../components/Logout';
// import { registerRoute } from '../utils/ApiRoutes';

function Register() {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('devChatUser'));
  // const [devs, setDevs] = useState([]);
  // const [users, setUsers] = useState([]);
  const [me, setMe] = useState({});
  let user = {};
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    linkedin: '',
    github: '',
    experience: '',
    specialization: '',
    country: '',
    city: '',
  });

  const toastOptions = {
    position: 'bottom-right',
    autoClose: 6000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  useEffect(() => {
    const fetchData = () => {
      axios
        .get('/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setMe(res.data);
          user = me;
        })
        .catch((err) => console.log(err));
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (handleValidation()) {
    //   const {
    //     firstName,
    //     lastName,
    //     password,
    //     userName,
    //     email,
    //     linkedIn,
    //     github,
    //     experience,
    //     specialization,
    //     country,
    //     city,
    //   } = values;

    //   const user = {
    //     firstName,
    //     lastName,
    //     password,
    //     userName,
    //     email,
    //     linkedIn,
    //     github,
    //     experience,
    //     specialization,
    //     country,
    //     city,
    //   };

    console.log(user);
    console.log('here');
    axios
      .put('/edit', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          user,
        },
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    //   const { data } = await axios.post('/register', {
    //     firstName,
    //     lastName,
    //     password,
    //     userName,
    //     email,
    //     linkedIn,
    //     github,
    //     experience,
    //     specialization,
    //     country,
    //     city,
    //   });

    //   if (data.status === false) {
    //     toast.error(data.msg, toastOptions);
    //   }
    //   if (data.status === true) {
    //     localStorage.setItem('devChat-user', JSON.stringify(data.user));
    //     navigate('/login');
    //   }
    // }
  };

  // const handleValidation = () => {
  //   const { password, confirmPassword, userName, email } = values;
  //   if (password !== confirmPassword) {
  //     toast.error('password should be the same', toastOptions);
  //     return false;
  //   } else if (userName.length < 3) {
  //     toast.error('username should be greater than 3 characters', toastOptions);
  //     return false;
  //   } else if (password.length < 8) {
  //     toast.error(
  //       'password should be equal to or greater than 8 characters',
  //       toastOptions
  //     );
  //     return false;
  //   } else if (email === '') {
  //     toast.error('email is required', toastOptions);
  //     return false;
  //   }
  //   return true;
  // };

  //   const handleChange = (event) => {
  //     setValues({ ...values, [event.target.name]: event.target.value });
  //   };

  // useEffect(() => {
  //   const users = () => {
  //     axios
  //       .get('/users')
  //       .then((res) => {
  //         setDevs(res.data);
  //         setUsers(res.data);
  //       })
  //       .catch((err) => console.log(err));
  //   };
  //   users();
  // }, []);

  // const filterCards = (event) => {
  //   const value = event.target.value.toLowerCase();
  //   const filteredUsers = devs.filter((dev) =>
  //     `${dev.firstName} ${dev.lastName}`.toLowerCase().includes(value)
  //   );
  //   setUsers(filteredUsers);
  // };

  const handleChange = (event) => {
    const key = event.target.name;
    // console.log(key);
    user[key] = event.target.value;
  };

  return (
    <>
      <section className="topbar">
        <div className="topbarContainer">
          <div className="topbarLeft">
            <Link to="/" style={{ textDecoration: 'none' }}>
              <span className="logo">
                DEVChat <BsKeyboard />
              </span>
            </Link>
          </div>
          {/* <div className="topbarCenter">
            <div className="searchbar">
              <BiSearch className="searchIcon" />
              <input
                placeholder="Search for devs"
                onInput={filterCards}
                className="searchInput"
              />
            </div>
          </div> */}
          <div className="topbarRight">
            <div className="topbarLinks">
              <Link to={'/Chat'} className="topbarLink">
                Chat <BiChat />{' '}
              </Link>

              <Link to={'/Profile'} className="topbarLink">
                Profile <BiUser />{' '}
              </Link>
            </div>

            <div className="logout">
              <Logout />{' '}
            </div>
          </div>
        </div>
      </section>

      <FormContainer>
        <div className="body">
          <div className="container">
            <div className="devchat">
              <h1>DevChat</h1>
            </div>
            <div className="forms">
              <div className="form login">
                <span className="title">Profile</span>

                <form onSubmit={(event) => handleSubmit(event)}>
                  <div className="form-side">
                    <div className="left-side">
                      <div className="input-field">
                        <input
                          type="text"
                          placeholder={me.user?.firstName || ''}
                          name="firstName"
                          onChange={(e) => handleChange(e)}
                        />
                        <i className="icon">
                          <BiUser />
                        </i>
                      </div>

                      <div className="input-field">
                        <input
                          type="text"
                          placeholder={me.user?.lastName || ''}
                          name="lasttName"
                          onChange={(e) => handleChange(e)}
                        />
                        <i className="icon">
                          <BiUser />
                        </i>
                      </div>

                      {/* <div className="input-field">
                        <input
                          type="password"
                          placeholder="Enter your password"
                          name="password"
                          onChange={(e) => handleChange(e)}
                        />
                        <i className="icon">
                          <BiLockOpen />
                        </i>
                      </div> */}

                      <div className="input-field">
                        <input
                          type="text"
                          placeholder={me.user?.github || ''}
                          name="github"
                          onChange={(e) => handleChange(e)}
                        />
                        <i className="icon">
                          <DiGithubBadge />
                        </i>
                      </div>

                      <div className="input-field">
                        <input
                          type="text"
                          placeholder={me.user?.linkedIn || ''}
                          name="linkedIn"
                          onChange={(e) => handleChange(e)}
                        />
                        <i className="icon">
                          <AiFillLinkedin />
                        </i>
                      </div>
                    </div>

                    <div className="right-side">
                      <div className="input-field">
                        <input
                          type="text"
                          placeholder={me.user?.expreience || ''}
                          name="expreience"
                          onChange={(e) => handleChange(e)}
                        />
                        <i className="icon">
                          <AiFillExperiment />
                        </i>
                      </div>

                      <div className="input-field">
                        <input
                          type="text"
                          placeholder={me.user?.title || ''}
                          name="specialization"
                          onChange={(e) => handleChange(e)}
                        />
                        <i className="icon">
                          <BiNetworkChart />
                        </i>
                      </div>

                      <div className="input-field">
                        <input
                          type="text"
                          placeholder={me.user?.address.country || ''}
                          name="country"
                          onChange={(e) => handleChange(e)}
                        />
                        <i className="icon">
                          <BiWorld />
                        </i>
                      </div>

                      <div className="input-field">
                        <input
                          type="text"
                          placeholder={me.user?.address.city || ''}
                          name="city"
                          onChange={(e) => handleChange(e)}
                        />
                        <i className="icon">
                          <FaCity />
                        </i>
                      </div>
                    </div>
                  </div>
                  {/* <div className="button">
                    <button type="submit">Update</button>
                  </div> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
.body {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #EEF2F7;
  }

  .container {
    position: relavtive;
    max-width: 1230px;
    width: 100%;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 5px 10px 2px rgba(0, 0, 0, 0.2);
  }

  .container .devchat {
    margin-top: 20px;
  }

  .devchat h1 {
    text-align: center;
  }

  .container .form {
    padding: 30px;
  }

  .container .form .title {
    position: relative;
    font-size: 27px;
    font-weight: 600;
  }

  .form-side {
    display: flex;
    justify-content: space-between;
  }

  .left-side {
    margin-left: 40px;
    width: 35%;
  }

  .right-side {
    margin-right: 40px;
    width: 35%;
  }

  .form .title::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    width: 30px;
    background-color: #4070f4;
    border-radius: 25px;
  }

  .form .input-field {
    position: relative;
    height: 50px;
    width: 100%;
    margin-top: 30px;
  }

  .input-field input {
    postion: absolute;
    height: 100%;
    width: 100%;
    padding: 0 35px;
    border: none;
    outline: none;
    font-size: 16px;
    border-bottom: 2px solid #ccc;
    border-top: 2px solid transparent;
    transition: all 0.2s ease;
  }

  .input-field input:is(:focus, :valid) {
    border-bottom-color: #4070f4;
  }

  .input-field i {
    margin-top: 10px;
    position: absolute;
    top: 50%
    transform: translateY(-50%);
    color: #999;
    font-size: 23px;
    transition: all 0.2s ease;
  }

  .input-field input:is(:focus, :valid) ~ i{
    color: #4070f4;
  }

  .input-field i.icon {
    left: 0;
  }

  .input-field i.showHidePW {
    right: 0;
  }

  .form .forget{
    margin-top: 20px;
    position: relative;
  }

  .form .text {
    color: #333;
    font-size: 14px;
  }

  .form .forget .text {
    color: #4070f4;
    text-decoration: none;
  }

  .form .forget .text:hover {
    text-decoration: underline;
  }

  .form .button {
    margin-top: 30px;
  }

  .form .button button{
    position: relative;
    height: 50px;
    width: 50%;
    margin-top: 20px;
    margin-left: 25%;
    border: none;
    color: #fff;
    font-size: 17px;
    font-weight: 500;
    letter-spacing: 1px;
    border-radius: 6px;
    background-color: #4070f4;
    transition: all 0.3s ease;
  }

  .button input:hover {
    background-color: #265df2;
  }

  .login-signup {
    margin-top: 25px;
    text-align: center;
  }

  .signup-text {
    font-size: 14px;
    color: #4070f4;
    text-decoration: none;
  }

  .signup-text:hover {
    text-decoration: underline;
  }
`;

export default Register;
