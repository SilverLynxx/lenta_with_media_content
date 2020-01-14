import React from 'react';



const LoadingView = (props) => {

  const { cssLoader } = props;

  return (
    <div className="_loading">
      { cssLoader }
    </div>
  )
}


export default LoadingView;