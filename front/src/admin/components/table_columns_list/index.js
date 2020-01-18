import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../actions';
import { ApiContext } from '../../contexts';
import TableColumn from '../table_column';
import TableColumnsListView from './view';



const TableColumnsList = (props) => {

  const apiService = React.useContext(ApiContext);

  const {
    currentTable,
    currentTableColumns,
    currentTableContent,
    fetchCurrentTableColumns, } = props;

  React.useEffect(() => {
    if (currentTable) {
      apiService.get_table_columns({table_name: currentTable})
      .then(r => fetchCurrentTableColumns(r.data.data))
      .catch(r => console.log(r));
    }
  }, [currentTable,]);


  const itemsList = currentTableColumns.map(
    ({column_name,}) => <TableColumn table_name={currentTable} column_name={column_name} />);

  return (
    <TableColumnsListView itemsList={itemsList} />)
};

const mapStateToProps = (store) => {

  return {
    currentTable: store.currentTable,
    currentTableColumns: store.currentTableColumns,
    currentTableContent: store.currentTableContent,
  }
};

const mapDispatchToProps = (dispatch) => {

  const dActions = actions(dispatch);

  return {
    fetchCurrentTableColumns: dActions.fetchCurrentTableColumns,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TableColumnsList);