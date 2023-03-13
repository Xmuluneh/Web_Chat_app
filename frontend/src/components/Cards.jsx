import React from 'react';
const Cards = (user) => {
  return (
    <div>
      <div className='card'>
        <div className='card__title'>
          {user.user.firstName} {user.user.lastName}
        </div>
        <div className='card__body'>
          <p>{user.user.address.country}</p>
          <p>{user.user.address.city}</p>
          <p>{user.user.title}</p>
          <p>{user.user.expreience}</p>
          <p>{user.user.Github}</p>

          <div className='card__image'>
            <img src={user.user.image} alt='user_image' />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cards;
