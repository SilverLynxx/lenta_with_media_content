import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../actions';
import { ApiContext } from '../../contexts'
import EditTableCellView from './view';



const EditTableCell = (props) => {

  const {
    table_name,
    conditions,
    column_name,
    currentTableColumns,
    new_value,
    inputNewValueEditTableCell, } = props;

  const apiService = React.useContext(ApiContext);

  const handleInputNewValue = (e) => {
    e.preventDefault();
    inputNewValueEditTableCell(e.target.value);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!(new_value && column_name && conditions )) {
      // console.log(new_value, column_name, conditions)
      alert('Incorrect data!');
      return
    }

    let data_type = '';
    for (let col of currentTableColumns) {
      if (col['column_name'] == column_name) {
        data_type = col['data_type'];
        break
      }
    }

    let value_dict = {};
    switch (data_type) {
      case "character varying": {
        value_dict[column_name] = new_value;
        break
      }
      case "integer": {
        value_dict[column_name] = parseInt(new_value);
        break
      }
      case "boolean": {
        value_dict[column_name] = (new_value == 'false')?false:true;
        break
      }
      default:
        return
    }
    console.log(table_name, conditions, value_dict)
    apiService.update_table_values({table_name, conditions, value: value_dict})
    .then(r => console.log(r))
    .catch(r => console.log(r));
  }

  return (
    <EditTableCellView {...{
      table_name,
      column_name,
      new_value,
      handleInputNewValue,
      handleSubmit,
      conditions }} />)
};

const mapStateToProps = (store) => {

  return {
    table_name: store.currentTable,
    conditions: store.editTableCell.conditions,
    column_name: store.editTableCell.column_name,
    currentTableColumns: store.currentTableColumns,
    new_value: store.editTableCell.new_value,
  }
};

const mapDispatchToProps = (dispatch) => {

  return {
    inputNewValueEditTableCell: actions(dispatch).inputNewValueEditTableCell,
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(EditTableCell)