import React from 'react';
import { connect } from 'react-redux';
import TableScreenView from './view';
import TablesList from '../tables_list';
import TableColumnsList from '../table_columns_list';
import TableColumnsOptions from '../table_columns_options';


const TableScreen = (props) => {

  const {
    currentTable, } = props;

  const tablesList = <TablesList />;
  const tableColumnsList = <TableColumnsList />;
  const tableColumnsOptions = <TableColumnsOptions currentTable={currentTable} />;

  return (
    <TableScreenView{...{
      tableColumnsOptions,
      tablesList,
      tableColumnsList }}/>)
};

const mapStateToProps = (store) => {

  return {
    currentTable: store.currentTable,
  }
};

export default connect(mapStateToProps)(TableScreen);