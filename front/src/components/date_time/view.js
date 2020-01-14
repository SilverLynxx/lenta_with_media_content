import React from 'react';



const DateTimeView = (props) => {

  const { dateTime } = props;

  return (
    <div className="date-time">
      { dateTime }
    </div>)
};


export default DateTimeView;