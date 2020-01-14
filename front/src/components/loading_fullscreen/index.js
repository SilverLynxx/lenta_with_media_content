import React from 'react';
import { connect } from 'react-redux';
import LoadingFullsceenView from './view';
import CssLoader from '../css_loader';


const LoadingFullscreen = (props) => {

  const { loadingState } = props;


  const cssLoader = <CssLoader />;

  return <LoadingFullsceenView cssLoader={cssLoader} loadingState={loadingState} />
};

const mapStateToProps = (store) => {

	return { loadingState: store.loadingState, }
}

export default connect(mapStateToProps)(LoadingFullscreen);