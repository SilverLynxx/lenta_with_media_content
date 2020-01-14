import React from 'react';



const LoadingInitialView = (props) => {

  const { cssLoader } = props;

  return (
    <div className="_loading-initial">
      { cssLoader }
    </div>
  )
}


export default LoadingInitialView;