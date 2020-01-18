import React from 'react';




const TableColumnsListView = (props) => {

  const {
    itemsList } = props;

  return (
    <div className="table-columns-list">
      { itemsList }
    </div>)
};


export default TableColumnsListView;