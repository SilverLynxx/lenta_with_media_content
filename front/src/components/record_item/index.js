import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ApiContext } from '../../contexts';
import { actions } from '../../actions';
import RecordItemView from './view';
import DateTime from '../date_time';


const RecordItem = (props) => {

  const {
    recordHeadline,
    username,
    postDate,
    recordText,
    recordid } = props;

  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    history.push(`/record/${recordid}`);
  };

  const formattedDate = <DateTime date={postDate}/>

  return (
    <RecordItemView {
      ...{
        recordHeadline,
        username,
        postDate,
        recordText,
        handleClick,
        formattedDate
      }
    }/>
  )
};

export default RecordItem