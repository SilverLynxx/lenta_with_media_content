import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../actions'
import TableColumnView from './view';




  // inputConditionsEditTableCell(payload) {
  //   return {
  //     type: 'INPUT_CONDITIONS_EDIT_TABLE_CELL',
  //     payload
  //   }
  // },

  // inputColumnNameEditTableCell(payload) {
  //   return {
  //     type: 'INPUT_COLUMN_NAME_EDIT_TABLE_CELL',
  //     payload
  //   }
  // }



const TableColumn = (props) => {

  const {
    currentTableContent,
    column_name,
    table_name,
    inputConditionsEditTableCell,
    inputColumnNameEditTableCell } = props;

  // const itemsList = currentTableContent.map(tableItem => tableItem[column_name]);

  const handleItemClick = (e, item) => {
    e.preventDefault();
    console.log(item);
    inputConditionsEditTableCell(item);
    inputColumnNameEditTableCell(column_name);
  };

  return (
    <TableColumnView {...{
      currentTableContent,
      column_name,
      handleItemClick}}/>)
};

const mapStateToProps = (store) => {

  return {
    currentTableContent: store.currentTableContent,
  }
}

const mapDispatchToProps = (dispatch) => {

  const dActions = actions(dispatch);

  return {
    inputConditionsEditTableCell: dActions.inputConditionsEditTableCell,
    inputColumnNameEditTableCell: dActions.inputColumnNameEditTableCell
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableColumn);