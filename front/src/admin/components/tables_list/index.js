import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../actions';
import { ApiContext } from '../../contexts';
import TablesListView from './view';
import TablesListItem from '../tables_list_item';



const TablesList = (props) => {

  const apiService = React.useContext(ApiContext);

  const {
    tables,
    fetchTables } = props;

  React.useEffect(() => {
    apiService.get_all_tables()
    .then(r => fetchTables(r.data.data))
    .catch(r => console.log(r));
  }, [tables,]);

  const itemsList = tables.map(item => {
    return (
      <TablesListItem key={item.table_name} {...item} />);
  });

  return (
    <TablesListView itemsList={itemsList} />)
};

const mapStateToProps = (store) => {

  return {
    tables: store.tables,
  }
};

const mapDispatchToProps = (dispatch) => {

  const dActions = actions(dispatch);

  return {
    fetchTables: dActions.fetchTables,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TablesList);