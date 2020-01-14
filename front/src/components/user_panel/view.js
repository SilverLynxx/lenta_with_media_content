import React from 'react';
import { Link } from 'react-router-dom';


const UserPanelView = (props) => {

  const {
    anonymous,
    username,
    loginForm,
    registerForm,
    loginSwitcher,
    toggleLoginPanel,
    toggleRegisterPanel,
    handleLogoutClick } = props;  

  if (anonymous) {
    return (
      <div className="user-panel">
        <div className="user-panel__login-button">
          <button
            onClick={(e) => toggleLoginPanel(e)}>
          </button>
        </div>
        <div className="user-panel__register-button">
          <button
            onClick={(e) => toggleRegisterPanel(e)}>
          </button>
        </div>
        <div 
          className={`user-panel__login-form ${(loginSwitcher == 'login')?'':'hidden'}`}>
          <div className="login-form-container">
            { loginForm }
          </div>
        </div>
        <div 
          className={`user-panel__register-form ${(loginSwitcher == 'register')?'':'hidden'}`}>
          <div className="register-form-container">
            { registerForm }
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="user-panel">
        <div className="user-panel__username">
          <Link to="/profile">{ username }</Link>
        </div>
        <div className="user-panel__logout">
          <button
            onClick={(e) => handleLogoutClick(e)}>
          </button>
        </div>
      </div>
    )
  }
};

export default UserPanelView;