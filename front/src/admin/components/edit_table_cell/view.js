import React from 'react';




const EditTableCellView = (props) => {

  const {
  	table_name,
  	column_name,
  	new_value,
  	handleInputNewValue,
  	handleSubmit,
  	conditions } = props;

  return (
  	<div className="edit-table-cell">
  	  |<span>{ String(table_name) }</span>|
  	  |<span>{ String(column_name) }</span>|
	  	<input 
	  	  value={new_value}
	  	  onChange={e => handleInputNewValue(e)}
		  	className="edit-table-cell__input-new-value" 
		  	placeholder="new value" />
		  <button
			  onClick={e => handleSubmit(e)}>submit</button>
			 {
				 	(conditions)
			 		?(() => {
			 			let items = [];
			 			for (let num in conditions) {
			 				items = [...items, (<div className="edit-table-cell__condition" >
			 					|{num}: {String(conditions[num])}|
			 					</div>)]
			 			};
			 			return items;
			 		})():null

			 }
  	</div>)
};


export default EditTableCellView;