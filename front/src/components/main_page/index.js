import React from 'react';
import { connect } from 'react-redux';
import MainPageView from './view';

import RecordsLenta from '../records_lenta';
import SubscriptionsList from '../subscriptions_list';
import LoginForm from '../login_form';
import RegisterForm from '../register_form';
import NewsLentaItem from '../news_lenta_item';

const MainPage = (props) => {

  const {
    anonymous } = props;

  const newsList = [
    {date: (new Date('2020-01-15T13:33:37.950044')).toISOString(), theme: 'Second post', text: 'И что дальше?'},
    {date: (new Date('2020-01-15T13:33:37.950044')).toISOString(), theme: 'First post', text: 'Ура! Всё работает.'},

  ];

  const newsListItems = newsList.map(item => <NewsLentaItem {...item}/>);

  const subscriptinsList = <SubscriptionsList />;
  const recordsLenta = <RecordsLenta />;
  const loginForm = <LoginForm />;
  const registerForm = <RegisterForm />;

  return (
    <MainPageView {...{
      anonymous,
      subscriptinsList,
      recordsLenta,
      loginForm,
      registerForm,
      newsListItems }}/>)
};

const mapStateToProps = (store) => {

  return {
    anonymous: store.session.anonymous,
  }
}

export default connect(mapStateToProps)(MainPage);