import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { actions } from '../../actions';
import RecordsListView from './view';
import RecordItem from '../record_item';


const RecordsList = (props) => {

  const { recordsList, } = props;

  const isZeroLength = (recordsList.length == 0)?true:false;

  const recordsItemsList = recordsList.map((item) => <RecordItem key={item.recordid} {...item}/>);

  return (
    <RecordsListView {
      ...{
        recordsItemsList,
        isZeroLength
      }
    }/>
  )
};


const mapStateToProps = (store) => {
  return {
    recordsList: store.records.recordsList,
  }
};

const mapDispatchToProps = (dispatch) => {

  const dispatchActions = actions('Records', dispatch);

  return { }
}


export default connect(mapStateToProps, mapDispatchToProps)(RecordsList)