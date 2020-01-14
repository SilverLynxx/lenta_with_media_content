import { bindActionCreators } from 'redux';
import authForms from './auth_forms';
import records from './records';
import session from './session';
import subscriptions from './subscriptions';
import reset from './reset';
import _loading from './loading';








export const actions = (name, dispatch) => {

  const actionsAuthForms = () => {
    return { 
      ...bindActionCreators(authForms, dispatch),
      sessionStart: bindActionCreators(session, dispatch).sessionStart
    };
  };


  const actionsRecords = () => {
    return { 
      ...bindActionCreators(records, dispatch),
    };
  };


  const actionsSessions = () => {
    return { 
      ...bindActionCreators(session, dispatch),
    };
  };


  const actionsSubscriptions = () => {
    return { 
      ...bindActionCreators(subscriptions, dispatch),
    };
  };


  const actionsReset = () => {
    return { 
      ...bindActionCreators(reset, dispatch),
    };
  };


  const actionsLoading = () => {
    return { 
      ...bindActionCreators(_loading, dispatch),
    };
  };


  const actionsDict = {
    AuthForms: actionsAuthForms,
    Records: actionsRecords,
    Session: actionsSessions,
    Subscriptions: actionsSubscriptions,
    Reset: actionsReset,
    Loading: actionsLoading
  };


  return actionsDict[name]();
}