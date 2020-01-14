import React from 'react';
import ReactTimeAgo from 'react-time-ago/tooltip';
import DateTimeView from './view';



const DateTime = (props) => {

  const { date } = props;

  const dateTime = <ReactTimeAgo date={new Date(date)} locale='en' timeStyle='twitter'/>;

  return (
    <DateTimeView dateTime={dateTime}/>)
};


export default DateTime;