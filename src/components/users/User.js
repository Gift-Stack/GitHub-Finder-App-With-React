import React, { useEffect, Fragment } from 'react';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Repos from './Repos';

const User = ({ singleUser, loading, getUser, getRepos, repos, match }) => {
  useEffect(() => {
    getUser(match.params.login);
    getRepos(match.params.login);
    //eslint-disable-next-line
  }, []);

  const {
    name,
    avatar_url,
    html_url,
    location,
    bio,
    blog,
    login,
    followers,
    following,
    public_repos,
    public_gists,
    company,
    hireable,
  } = singleUser;
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/' className='btn btn-light'>
            Back To Search
          </Link>
          <span>
            Hireable:{' '}
            {hireable ? (
              <i className='fas fa-check text-success'></i>
            ) : (
              <i className='fas fa-times-circle text-danger'></i>
            )}
          </span>
          <div className='card grid-2 '>
            <div className='all-center'>
              <img
                src={avatar_url}
                alt=''
                className='round-img'
                style={{ width: '150px' }}
              />
              <h1> {name} </h1>
              <p> Location: {location} </p>
            </div>
            <div>
              {bio && (
                <Fragment>
                  <h3>Bio</h3>
                  <div>{bio}</div>
                </Fragment>
              )}
              <a
                href={html_url}
                style={{ marginTop: '15px' }}
                className='btn btn-dark'
              >
                Visit GitHub Profile
              </a>

              <ul style={{ marginTop: '15px' }}>
                <li>
                  {login && (
                    <Fragment>
                      <strong>Username: {login}</strong>
                    </Fragment>
                  )}
                </li>
                <li>
                  {company && (
                    <Fragment>
                      <strong>Company: {company}</strong>
                    </Fragment>
                  )}
                </li>
                <li>
                  {blog && (
                    <Fragment>
                      <strong>Website: {blog}</strong>
                    </Fragment>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <div className='card grid-4 all-center '>
            <div className='badge badge-danger'>Followers: {followers}</div>
            <div className='badge badge-success'>Following: {following}</div>
            <div className='badge badge-light'>
              Public Repos: {public_repos}
            </div>
            <div className='badge badge-dark'>Public Gist: {public_gists} </div>
          </div>
        </Fragment>
      )}
      <Repos getRepos={getRepos} repos={repos} />
    </Fragment>
  );
};
User.propTypes = {
  getUser: PropTypes.func.isRequired,
  getRepos: PropTypes.func.isRequired,
  Repos: PropTypes.array.isRequired,
};

export default User;
