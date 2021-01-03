import React from 'react';
import Repo from './Repo';
import PropTypes from 'prop-types';

const Repos = ({ repos }) => {
  console.log(repos);
  return (
    <div>
      {repos.map((repo) => (
        <Repo repo={repo} key={repo.id} />
      ))}
    </div>
  );
};
Repos.protoType = {
  repos: PropTypes.array.isRequired,
};

export default Repos;
