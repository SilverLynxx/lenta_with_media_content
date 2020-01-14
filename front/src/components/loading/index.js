import React from 'react';
import LoadingView from './view';
import CssLoader from '../css_loader';


const Loading = (props) => {

  const cssLoader = <CssLoader />;

  return <LoadingView cssLoader={cssLoader} />
};

export default Loading;