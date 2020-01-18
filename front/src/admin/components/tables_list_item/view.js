import React from 'react';



const TablesListItemView = (props) => {

	const {
		table_name,
		handleClick	} = props;

	return (
		<div
			onClick={(e) => handleClick(e)} 
			className="tables-list-item">{table_name}</div>)
};

export default TablesListItemView;