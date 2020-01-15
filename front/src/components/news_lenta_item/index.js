import React from 'react';
import NewsLentaItemView from './view';
import DateTime from '../date_time';


const NewsLentaItem = (props) => {


  const {
    theme,
    date,
    text } = props;

  return (
    <NewsLentaItemView {...{
      theme,
      text,
      date: <DateTime date={date} /> }} />
  )
};

export default NewsLentaItem;