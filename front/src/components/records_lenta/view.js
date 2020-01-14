import React from 'react';



const RecordsLentaView = (props) => {

  const {
    recordsItemsList,
    handleRefresh } = props;

  return (
    <div className="records-lenta">
      <div className=" records-lenta__control">
        <button 
          onClick={(e) => handleRefresh(e)}
          className=" records-lenta__refresh">refresh</button>
      </div>
      <div className=" records-lenta__records-list">
        { recordsItemsList }
      </div>
    </div>
  )
};

export default RecordsLentaView;