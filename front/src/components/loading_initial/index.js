import React from 'react';
import LoadingInitialView from './view';
import CssLoader from '../css_loader';


const LoadingInitial = (props) => {


  const cssLoader = <CssLoader />;

  return <LoadingInitialView cssLoader={cssLoader} />
};



export default LoadingInitial;