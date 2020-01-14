import React from 'react';




const RecordsListView = (props) => {

  const { recordsItemsList, isZeroLength } = props;

  return (
    <div className="records-list-container">
        {
          isZeroLength?<div className="records-list-container__placeholder">No results...</div>:null
        }
        { recordsItemsList }
    </div>
  )
};

export default RecordsListView;