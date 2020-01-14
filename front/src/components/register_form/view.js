import React from 'react';




const RegisterFormView = (props) => {

  const {
    username,
    email,
    password,
    passwordAgain,
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    handlePasswordAgainChange,
    handleSubmit,
    handleClose } = props;

  return (
    <div className="register-form">
      <div className="register-form__close">
        <button
          onClick={(e) => handleClose(e)} ></button>
      </div>      
      <div className="register-form__username">
        <input
          value={username}
          onChange={(e) => handleUsernameChange(e)}
          placeholder="Username" />
      </div>
      <div className="register-form__email">
        <input
          value={email}
          onChange={(e) => handleEmailChange(e)}
          placeholder="Email" />
      </div>
      <div className="register-form__password">
        <input 
          value={password}
          onChange={(e) => handlePasswordChange(e)}
          placeholder="Password" 
          type="password"/>
      </div>
      <div className="register-form__password-again">
        <input 
          value={passwordAgain}
          onChange={(e) => handlePasswordAgainChange(e)}
          placeholder="PasswordAgain" 
          type="password"/>
      </div>
      <div className="register-form__submit">
        <button
          onClick={(e) => handleSubmit(e)} >register</button>
      </div>      
    </div>
  )
};

export default RegisterFormView;