import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ApiContext } from '../../contexts';
import { actions } from '../../actions';
import LoginFormView from './view';


const LoginForm = (props) => {

  const apiService = React.useContext(ApiContext);

  const {
    username,
    password,
    inputUsername,
    inputPassword,
    sessionStart,
    resetAll,
    changeLoginSwitcher } = props;

  const history = useHistory();

  const handleUsernameChange = (e) => {
    e.preventDefault();
    inputUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    inputPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    apiService.login({username, password})
    .then(r => {
      history.push('/');
      changeLoginSwitcher('');
      try {
        resetAll();
        sessionStart(r.data.data);
      } catch {}
    })
    .catch(r => console.log(r));
    inputUsername('');
    inputPassword('');
  };

  return (
    <LoginFormView {
      ...{
        username,
        password,
        handleUsernameChange,
        handlePasswordChange,
        handleSubmit
      }
    }/>
  )
};


const mapStateToProps = (store) => {
  return {
    username: store.authForms.loginUsername,
    password: store.authForms.loginPassword,
  }
};

const mapDispatchToProps = (dispatch) => {

  const dispatchActions = actions('AuthForms', dispatch)

  return {
    inputUsername: dispatchActions.inputLoginUsername,
    inputPassword: dispatchActions.inputLoginPassword,
    sessionStart: dispatchActions.sessionStart,
    resetAll: actions('Reset', dispatch).resetAll
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)