import React from 'react';



const NewsLentaItemView = (props) => {

  const {
    theme,
    date,
    text } = props;

  return (
    <div className="news-lenta-item">
      <div className="news-lenta-item__date">
        { date }
      </div>
      <div className="news-lenta-item__theme">
        { theme }
      </div>
      <div className="news-lenta-item__text">
        { text }
      </div>
    </div>
  )
};

export default NewsLentaItemView;