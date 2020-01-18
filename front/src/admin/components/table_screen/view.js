import React from 'react';




const TableScreenView = (props) => {

  const {
    tableColumnsOptions,
    tablesList,
    tableColumnsList } = props;

  return (
    <div className="table-screen">
      { tableColumnsOptions }
      { tablesList }
      { tableColumnsList }
    </div>)
};


export default TableScreenView;