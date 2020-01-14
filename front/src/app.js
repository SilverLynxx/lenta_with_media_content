import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginForm from './components/login_form';
import RegisterForm from './components/register_form';
import SearchRecord from './components/search_record';
import CreateRecordForm from './components/create_record_form';
import NavPanel from './components/nav_panel';
import ProfilePage from './components/profile_page';
import RecordDetails from './components/record_details';

import '../styles/main.css';
import '../styles/nav_panel.css';
import '../styles/user_panel.css';
import '../styles/profile_page.css';
import '../styles/subscription_item.css';
import '../styles/subscriptions_list.css';
import '../styles/record_details.css';
import '../styles/record_item.css';
import '../styles/records_list.css';
import '../styles/records_lenta.css';
import '../styles/search_record.css';
import '../styles/main_menu.css';
import '../styles/media_content.css';
import '../styles/media_content_edit.css';
import '../styles/media_content_item.css';
import '../styles/date_time.css';
import '../styles/create_record_form.css';

import '../styles/_loading.css';
import '../styles/css_loader.css';



const App = (props) => {
  return (
    <div className="app-root">
      <NavPanel />
      <div className="main-container">
        <div className="main-content">
          <Switch>
            <Route
              path="/"
              render={() => <div>MAIN PAGE WITH USER`S SUBSCRIPTIONS</div>}
              exact />
            <Route
              path="/profile"
              render={() => <ProfilePage />}
              exact />
            <Route
              path="/login"
              render={() => <LoginForm />}
              exact />
            <Route
              path="/register"
              render={() => <RegisterForm />}
              exact />
            <Route
              path="/record/:recordid"
              render={({match,}) => <RecordDetails match={match}/>}/>
            <Route
              path="/search"
              render={() => <SearchRecord />}
              exact />
            <Route
              path="/create_record_form"
              render={() => <CreateRecordForm />}
              exact />
          </Switch>
        </div>
      </div>
    </div>
  );
};


export default App;
