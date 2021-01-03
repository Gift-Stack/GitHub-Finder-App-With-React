import React from 'react';
import { Link } from 'react-router-dom';

const UserItem = ({ user: { avatar_url, login } }) => {
  return (
    <div className='card text-center'>
      <img
        src={avatar_url}
        alt=''
        className='round-img'
        style={{ width: '60px' }}
      />
      <h3>Name: {login}</h3>
      <Link to={`/user/${login}`} className='btn btn-dark btn-sm my-1'>
        More
      </Link>
    </div>
  );
};

export default UserItem;
