import React from 'react';




const TablesListView = (props) => {

  const {
    itemsList } = props;

  return (
    <div className="tables-list">
      { itemsList }
    </div>)
};


export default TablesListView;