import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actions } from '../../actions';
import { ApiContext } from '../../contexts';
import UserPanelView from './view';
import LoginForm from '../login_form';
import RegisterForm from '../register_form';


const UserPanel = (props) => {

  const { 
    anonymous,
    username,
    resetAll } = props;

  const apiService = React.useContext(ApiContext);
  const history = useHistory();

  const [loginSwitcher, changeLoginSwitcher] = React.useState('');

  const toggleLoginPanel = (e) => {
    e.preventDefault(); 
    (loginSwitcher != 'login')?changeLoginSwitcher('login'):changeLoginSwitcher('');
  }
  const toggleRegisterPanel = (e) => {
    e.preventDefault(); 
    (loginSwitcher != 'register')?changeLoginSwitcher('register'):changeLoginSwitcher('');
  }

  const handleLogoutClick = () => {
    apiService.logout()
    .then(r => {
      history.replace('/');
      resetAll();
    })
    .catch(r => console.log(r))
  };

  const loginForm = <LoginForm changeLoginSwitcher={changeLoginSwitcher} />
  const registerForm = <RegisterForm changeLoginSwitcher={changeLoginSwitcher} />

  return (
    <UserPanelView {...{
      anonymous,
      username,
      loginForm,
      registerForm,
      loginSwitcher,
      toggleLoginPanel,
      toggleRegisterPanel,
      handleLogoutClick,
    }}/>
  )
};


const mapStateToProps = (store) => {

  return {
    anonymous: store.session.anonymous,
    username: store.session.username,
  }
};

const mapDispatchToProps = (dispatch) => {

  const dispatchActions = actions('Reset', dispatch);


  return {
    resetAll: dispatchActions.resetAll
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(UserPanel)