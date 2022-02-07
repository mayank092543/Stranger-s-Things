import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';


import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Posts from './components/Posts';
import LogoutForm from './components/LogoutForm';
import Profile from './components/Profile';

function App() {

  return (
    <>
      <BrowserRouter>
        <div id="container">
          <div id="header">
            <p className="title">Strangers Things</p>

            <nav id="navbar">
              <Link to ="/posts" className="link">Posts</Link>
              <Link to ="/profile" className="link">Profile</Link>
              <Link to ="/login" className="link">LogIn</Link>
              <Link to ="/signup" className="link">SignUp</Link>
              <Link to ="/logout" className="link">LogOut</Link>
              
            </nav>

          </div>

          <img id="Logo" src="Logo.png" />

          <div id="main-content">

            <Route path="/posts">
              <Posts />
            </Route>

            <Route path="/login">
              <LoginForm />
            </Route>

            <Route path="/signup">
              <RegisterForm />
            </Route>

            <Route path="/logout">
              <LogoutForm />
            </Route>

            <Route path="/profile">
              <Profile />
            </Route>

          </div>


        </div>
      </BrowserRouter>
    </>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);