import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MainMenuView from './view';


const MainMenu = (props) => {

  const { links } = props;

  const linksList = links.map(item => <Link key={item.link} to={item.link}>{ item.name }</Link>)

  const [toggle, changeToggle] = React.useState('hidden');

  const handleToggle = (e) => {
    e.preventDefault();
    (toggle == 'hidden')?changeToggle(''):changeToggle('hidden');
  };

  return (
    <MainMenuView {...{ 
      linksList,
      toggle,
      handleToggle }}/>
  )
};

const mapStateToProps = (store) => {

  return {
    links: store.mainMenu.links,
  }
}

export default connect(mapStateToProps)(MainMenu);