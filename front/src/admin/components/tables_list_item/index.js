import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../actions';
import TablesListItemView from './view';



const TablesListItem = (props) => {

  const {
    table_name,
    setCurrentTable,
    fetchCurrentTableContent,
    clearOptions } = props;

  const handleClick = (e) => {
    e.preventDefault(e);
    setCurrentTable(table_name);
    fetchCurrentTableContent([]);
    clearOptions();
  };

  return (
    <TablesListItemView {...{
      table_name,
      handleClick}} />)
};

const mapStateToProps = (store) => {

  return {
  }
};

const mapDispatchToProps = (dispatch) => {

  return {
    setCurrentTable: actions(dispatch).setCurrentTable,
    fetchCurrentTableContent: actions(dispatch).fetchCurrentTableContent,
    clearOptions: actions(dispatch).clearOptions,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TablesListItem)