import React from 'react';




const LoginFormView = (props) => {

  const {
    username,
    password,
    handleUsernameChange,
    handlePasswordChange,
    handleSubmit } = props;

  return (
    <div className="login-form">
      <div className="login-form__username">
        <input
          value={username}
          onChange={(e) => handleUsernameChange(e)}
          placeholder="Username" />
      </div>
      <div className="login-form__password">
        <input 
          value={password}
          onChange={(e) => handlePasswordChange(e)}
          placeholder="Password" 
          type="password"/>
      </div>
      <div className="login-form__submit">
        <button
          onClick={(e) => handleSubmit(e)} >login</button>
      </div>      
    </div>
  )
};

export default LoginFormView;