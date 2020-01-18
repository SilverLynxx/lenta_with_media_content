import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../actions';
import { ApiContext } from '../../contexts';
import TableColumnsOptionsView from './view';
import EditTableCell from '../edit_table_cell';

const TableColumnsOptions = (props) => {

  const {
    currentTable, } = props;

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
    conditionValue, } = props;

  const {
    inputLimit,
    inputOffset,
    inputOrderBy,
    inputAscDesc,
    addCondition,
    clearCondition,
    inputConditionType,
    inputConditionDataType,
    inputConditionValue,
    selectConditionColumn,
    fetchCurrentTableContent } = props;

  const apiService = React.useContext(ApiContext);
 
  const handleInputLimit = (e) => {
    e.preventDefault();
    inputLimit(parseInt(e.target.value));
  }

  const handleInputOffset = (e) => {
    e.preventDefault();
    inputOffset(parseInt(e.target.value));
  }

  const handleOrderByClick = (e, column_name) => {
    e.preventDefault();
    inputOrderBy(column_name);
  }

  const handleAscDescClick = (e, ad) => {
    e.preventDefault();
    inputAscDesc(ad);
  }

  const handleAddCondition = (e) => {
    e.preventDefault();
    addCondition([conditionColumn, conditionType, conditionValue, conditionDataType]);
  }

  const handleClearCondition = (e) => {
    e.preventDefault();
    clearCondition();
  }

  const handleInputConditionType = (e) => {
    e.preventDefault();
    inputConditionType(e.target.value);
  }

  const handleInputConditionDataType = (e) => {
    e.preventDefault();
    if (e.target.value == 'boolean') {
      if (conditionValue == 'f') {
        inputConditionValue(false)
      } else {
        inputConditionValue(true)
      }
    };
    inputConditionDataType(e.target.value);
  }

  const handleInputConditionValue = (e) => {
    e.preventDefault();
    if (conditionDataType == 'boolean') {
      if (e.target.value == 'f') {
        inputConditionValue(false)
      } else {
        inputConditionValue(true)
      }
    } else {
      inputConditionValue(e.target.value)
    };
  }

  const handleSelectConditionColumn = (e , column_name) => {
    e.preventDefault();
    selectConditionColumn(column_name);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const table_name = currentTable;
    apiService.get_table_values({table_name, limit, offset, order_by, asc_desc, conditions})
    .then(r => fetchCurrentTableContent(r.data.data))
    .catch(r => console.log(r));
  }

  const editTableCell = <EditTableCell />

  return (
    <TableColumnsOptionsView {...{
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
      fetchCurrentTableContent,
      editTableCell }} />);
};


const mapStateToProps = (store) => {


  return {
    limit: store.options.limit,
    offset: store.options.offset,
    columnsList: store.currentTableColumns,
    conditions: store.options.conditions,
    order_by: store.options.order_by,
    asc_desc: store.options.asc_desc,
    conditionDataType: store.options.conditionDataType,
    conditionType: store.options.conditionType,
    conditionValue: store.options.conditionValue,
    conditionColumn: store.options.conditionColumn

  }
};

const mapDispatchToProps = (dispatch) => {

  const dActions = actions(dispatch); 
 
  return {
    inputLimit: dActions.inputLimit,
    inputOffset: dActions.inputOffset,
    inputOrderBy: dActions.inputOrderBy,
    inputAscDesc: dActions.inputAscDesc,
    addCondition: dActions.addCondition,
    clearCondition: dActions.clearCondition,
    inputConditionType: dActions.inputConditionType,
    inputConditionDataType: dActions.inputConditionDataType,
    inputConditionValue: dActions.inputConditionValue,
    selectConditionColumn: dActions.selectConditionColumn,
    fetchCurrentTableContent: dActions.fetchCurrentTableContent

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableColumnsOptions)