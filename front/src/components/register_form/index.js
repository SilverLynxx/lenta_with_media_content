import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ApiContext } from '../../contexts';
import { actions } from '../../actions';
import RegisterFormView from './view';


const RegisterForm = (props) => {

  const apiService = React.useContext(ApiContext);

  const {
    username,
    email,
    password,
    passwordAgain,
    inputUsername,
    inputEmail,
    inputPassword,
    inputPasswordAgain,
    changeLoginSwitcher } = props;

  const history = useHistory();

  const handleUsernameChange = (e) => {
    e.preventDefault();
    inputUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    e.preventDefault();
    inputEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    inputPassword(e.target.value);
  };

  const handlePasswordAgainChange = (e) => {
    e.preventDefault();
    inputPasswordAgain(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password == passwordAgain) {
      apiService.register({username, email, password})
      .then(r => {
        console.log(r);
        inputUsername('');
        inputEmail('');
        inputPassword('');
        inputPasswordAgain('');
        changeLoginSwitcher('');
        history.push('/');
      })
      .catch(r => console.log(r));
    } else {
      alert('Password dont matches!')
    }
  };

  return (
    <RegisterFormView {
      ...{
        username,
        email,
        password,
        passwordAgain,
        handleUsernameChange,
        handleEmailChange,
        handlePasswordChange,
        handlePasswordAgainChange,
        handleSubmit
      }
    }/>
  )
};


const mapStateToProps = (store) => {
  return {
    username: store.authForms.registerUsername,
    email: store.authForms.registerEmail,
    password: store.authForms.registerPassword,
    passwordAgain: store.authForms.registerPasswordAgain,
  }
};

const mapDispatchToProps = (dispatch) => {

  const dispatchActions = actions('AuthForms', dispatch);

  return {
    inputUsername: dispatchActions.inputRegisterUsername,
    inputEmail: dispatchActions.inputRegisterEmail,
    inputPassword: dispatchActions.inputRegisterPassword,
    inputPasswordAgain: dispatchActions.inputRegisterPasswordAgain,
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)