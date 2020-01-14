import React from 'react';



const LoadingFullsceenView = (props) => {

  const { cssLoader, loadingState } = props;

  return (
  	loadingState
    ?<div className="_loading-fullscreen">
      { cssLoader }
    </div>
    :null
  )
}


export default LoadingFullsceenView;