import React from 'react';




const NavPanelView = (props) => {

  const { 
    userPanel,
    mainMenu,
    loadingFullscreen } = props;

  return (
    <div className="nav-panel">
      <div className="nav-panel__main-menu-container">
        { mainMenu }
      </div>
      <div className="nav-panel__user-panel-container">
        { userPanel }
      </div>
      { loadingFullscreen }
    </div>
  )
};

export default NavPanelView;