import React, { Fragment } from 'react';

const Repo = ({ repo }) => {
  return (
    <div className='card'>
      <a href={repo.html_url} target='_blank' style={{ cursor: 'pointer' }}>
        {repo.name}
      </a>
    </div>
  );
};

export default Repo;
