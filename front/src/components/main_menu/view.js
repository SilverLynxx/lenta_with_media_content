import React from 'react';



const MainMenuView = (props) => {

  const { 
    linksList,
    toggle,
    handleToggle } = props;

  return (
    <div className="main-menu">
      
      <div className="main-menu__menu-toggle">
        <button
          onClick={(e) => handleToggle(e)}></button>
      </div>
      
      <div 
        onClick={(e) => handleToggle(e)}
        className={`main-menu__links-container ${toggle}`}>
        { linksList }
      </div>
    </div>
  )
};


export default MainMenuView;