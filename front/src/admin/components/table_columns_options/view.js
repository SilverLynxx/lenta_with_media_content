import React from 'react';

const TableColumnsOptionsView = (props) => {

	const {
    limit,
    offset,
    columnsList,
    conditions,
    order_by,
    asc_desc,
    conditionType,
    conditionColumn,
    conditionDataType,
    conditionValue,
		handleInputLimit,
		handleInputOffset,
		handleOrderByClick,
		handleAscDescClick,
		handleAddCondition,
		handleClearCondition,
		handleInputConditionType,
		handleInputConditionValue,
		handleSelectConditionColumn,
	  handleInputConditionDataType,
	  handleSubmit,
	  editTableCell } = props;


	return (
		<div className="table-columns-options">
			<div className="table-columns-options__limit">
				<span className="option-title">
					Limit
				</span>
				<input value={limit} onChange={e => handleInputLimit(e)}/>
			</div>
			<div className="table-columns-options__offset">
				<span className="option-title">
					Offset
				</span>
				<input value={offset} onChange={e => handleInputOffset(e)}/>
			</div>
			<div className="table-columns-options__orderby">
				<span className="option-title">
					Order by
				</span>
				{ 
					columnsList.map(({column_name,}) => {
						return (
							<button 
								className={`${(column_name == order_by)?'selected':''}`}
								onClick={e => handleOrderByClick(e, column_name)}>
								{column_name}
							</button>)
					})
				}
				<span className="table-columns-options__orderby-selected">
				</span>
			</div>
			<div className="table-columns-options__asc-desc">
				<span className="option-title">
					asc/desc
				</span>
				<button 
						className={`${(asc_desc == 'asc')?'selected':''}`}
						onClick={e => handleAscDescClick(e, 'asc')}>asc</button>
				<button 
						className={`${(asc_desc == 'desc')?'selected':''}`}
						onClick={e => handleAscDescClick(e, 'desc')}>desc</button>
				<span className="table-columns-options__asc-desc-selected">
				</span>
			</div>
			<div className="table-columns-options__conditions">
				<span className="option-title">
					Conditions
				</span>
				{ columnsList.map(({column_name,}) => {
						return <button 
								className={`${(column_name == conditionColumn)?'selected':''}`}
								onClick={e => handleSelectConditionColumn(e, column_name)}>
							{column_name}
						</button>
				})}
				<input
				  value={conditionType} 
				  onChange={e => handleInputConditionType(e)} placeholder="condition type"/>
				<input
				  value={conditionValue} 
				  onChange={e => handleInputConditionValue(e)} placeholder="condition value"/>
				<input
				  value={conditionDataType} 
				  onChange={e => handleInputConditionDataType(e)} placeholder="condition data type"/>
				<button onClick={e => handleAddCondition(e)}>add</button>
				<button onClick={e => handleClearCondition(e)}>clear</button>

				{ 
					conditions.map(con => {
						const con_column = con[0];
						const con_value = con[2];
					  const con_condition_type = con[1];
					  const con_data_type = con[3];
					  return (
					  	<div className="table-columns-options__conditions-item">
						  	|{con_data_type}: {con_column}{con_condition_type}{String(con_value)}|
						  </div>)
				  })
				}
				<button 
					className="table-columns-options__submit" 
					onClick={e => handleSubmit(e)}>submit</button>
		</div>
			  { editTableCell }
		</div>)
};


export default TableColumnsOptionsView;



        // table_name = incoming_data.get('table_name')
        // limit = incoming_data.get('limit')
        // offset = incoming_data.get('offset')
        // order_by = incoming_data.get('order_by')
        // asc_desc = incoming_data.get('asc_desc')
        // conditions = incoming_data.get('conditions')