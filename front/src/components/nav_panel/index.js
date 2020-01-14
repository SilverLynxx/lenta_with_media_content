import React from 'react';
import { connect } from 'react-redux';
import { ApiContext } from '../../contexts';
import { actions } from '../../actions';
import NavPanelView from './view';
import UserPanel from '../user_panel';
import MainMenu from '../main_menu';
import LoadingFullscreen from '../loading_fullscreen';


const NavPanel = (props) => {

  const { sessionStart } = props;

  const userPanel = <UserPanel />;
  const mainMenu = <MainMenu />;
  const loadingFullscreen = <LoadingFullscreen />;

  const apiService = React.useContext(ApiContext);

  React.useEffect(() => {
    apiService.session_info()
    .then(r => (!r.data.data.anonymous)?sessionStart(r.data.data):null)
    .catch(r => console.log(r))
  })

  return (
    <NavPanelView {...{
      userPanel,
      mainMenu,
      loadingFullscreen
    }}/>
  )
};

const mapStateToProps = (store) => {

  return {}
};

const mapDispatchToProps = (dispatch) => {

  const dispatchActions = actions('Session', dispatch);

  return {
    sessionStart: dispatchActions.sessionStart,
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(NavPanel);