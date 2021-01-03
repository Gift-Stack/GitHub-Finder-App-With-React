import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';

const App = () => {
  const [user, setUser] = useState([]);
  const [repos, setRepos] = useState([]);
  const [singleUser, setSingleUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const searchUsers = async (text) => {
    setLoading(true);
    const res = await axios(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUser(res.data.items);
    setLoading(false);
  };
  const clearUsers = () => {
    setUser([]);
    setLoading(false);
  };

  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };
  const getUser = async (login) => {
    setLoading(true);
    const res = await axios(
      `https://api.github.com/users/${login}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setSingleUser(res.data);
    setLoading(false);
  };
  const getRepos = async (user) => {
    setLoading(true);
    const res = await axios(
      `https://api.github.com/users/${user}/repos?per_page=5&sort=created: asc&${process.env.REACT_APP_GITHUB_CLIENT_ID}&${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setRepos(res.data);
    setLoading(false);
  };
  return (
    <Router>
      <div>
        <Navbar title=' GitHub Finder' icon='fab fa-github' />
        <div className='container '>
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path='/'
              render={(props) => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={user.length > 0 ? true : false}
                    setAlert={showAlert}
                  />
                  <Users loading={loading} users={user} />
                </Fragment>
              )}
            />
            <Route exact path='/about' component={About} />
            <Route
              exact
              path='/user/:login'
              render={(props) => (
                <User
                  {...props}
                  getUser={getUser}
                  getRepos={getRepos}
                  repos={repos}
                  singleUser={singleUser}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
