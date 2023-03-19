import React from 'react';
import axios from './axiosInstance';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Card from '..components/Cards';
import { BiSearch, BiChat, BiUser, BiEnvelope } from 'react-icons/bi';
import { BsKeyboard } from 'react-icons/bs';
import Logout from '../components/Logout';
import './Welcome.css';
import './Chat.css';
function Welcome() {
  const navigate = useNavigate();
  const [dev, setDev] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [users, setUsers] = useEffect([]);

  useEffect(() => {
    const users = () => {
      axios
        .get('/users')
        .then((response) => {
          setDev(response.data);
          setUsers(response.data);
        })
        .catch((err) => console.log(err));
    };
    users();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const filterCards = (event) => {
    const values = event.target.value.tolowerCase();
    const filteredUsers = dev.filter((dev) =>
      `${dev.firstName} ${dev.lastName}`.toLowerCase.includes(values)
    );
    setUsers(filteredUsers);
  };
  return (
    <>
      <section className='topbar'>
        <div className='topbarContainer'>
          <div className='topbarLeft'>
            <Link to='/' style={{ textDecoration: 'none' }}>
              <span className='logo'>
                DEVChat <BsKeyboard />
              </span>
            </Link>
          </div>
          <div className='topbarCenter'>
            <div className='searchbar'>
              <BiSearch className='searchIcon' />
              <input
                placeholder='Search for devs'
                onInput={filterCards}
                className='searchInput'
              />
            </div>
          </div>
          <div className='topbarRight'>
            <div className='topbarLinks'>
              <Link to={'/Chat'} className='topbarLink'>
                Chat <BiChat />{' '}
              </Link>

              <Link to={'/Profile'} className='topbarLink'>
                Profile <BiUser />{' '}
              </Link>
            </div>

            <div className='logout'>
              <Logout />{' '}
            </div>
          </div>
        </div>
      </section>

      <section className='body'>
        <div className='cards-container'>
          {users.map((dev, index) => (
            <Card key={index} user={dev} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Welcome;
