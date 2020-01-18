import React from 'react';




const TableColumnView = (props) => {

  const {
    currentTableContent,
    column_name,
    handleItemClick } = props;

  return (
    <div className="table-column">
      <div className="table-column__column-name">
        { column_name }
      </div>
      { 
        currentTableContent.map(
          item => {
            return (
              <div
                onClick={e => handleItemClick(e, item)} 
                className="table-column__item">
                { String(item[column_name]) }
              </div>
            )
          }
        ) 
      }
    </div>)
};


export default TableColumnView;