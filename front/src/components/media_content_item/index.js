import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../actions';
import { ApiContext } from '../../contexts';
import { mountContent } from '../../lib';
import MediaContentItemView from './view';


// const mountContent = (media_type, media_data, mediaRoot) => {

//   const data = JSON.parse(media_data);

//   try {
// 	  switch (media_type) {
// 	  	case 'embedded_video': {
// 	  		const mountElement = document.getElementById(mediaRoot);
// 	  		mountElement.innerHTML = `
// 	        <iframe 
// 	          class="media-frame"
// 	          src=${data.url} 
// 	          frameborder="0" 
// 	          scrolling="no" 
// 	          allowfullscreen></iframe>`;
// 		    break;
// 	  	}
// 	  	default: {
// 	  		const mountElement = document.getElementById(mediaRoot);
// 	  		mountElement.innerHTML = '<span>Unsupported content</span>';
// 		    break;
// 	  	}
// 	  }; } catch {} ;
// };


const MediaContentItem = (props) => {

	const {
		selfusername,
		recordid,
    mediaid,
    username,
    media_type,
    media_data,
    media_description,
    fetchRecordMedia,
    loading,
    loaded } = props;

  const mediaRoot = 'media-root';
  const myselfIsOwner = (selfusername == username);
  const apiService = React.useContext(ApiContext);

  const handleClick = (e) => {
  	e.preventDefault();
  	mountContent(media_type, media_data, mediaRoot)
  };

  const handleDelete = (e) => {
  	e.preventDefault();
  	e.stopPropagation();
  	loading();
  	apiService.delete_record_media({mediaid,})
  	.then(r => {
  		loaded();
  		apiService.get_record_media({recordid,})
  		.then(r => {
  			fetchRecordMedia(r.data.data);})
  		.catch(r => console.log(r));
  	})
		.catch(r => {
			loaded();
			console.log(r)});
  };

  const handleEdit = (e) => {
  	e.preventDefault();
  	e.stopPropagation();
  	console.log('edit')
  };

	return (
		<MediaContentItemView {...{
			myselfIsOwner,
	    mediaRoot,
	    username,
	    media_description,
		  handleClick,
	    handleDelete,
	    handleEdit }}/>)
};

const mapStateToProps = (store) => {

	return {
    selfusername: store.session.username,
	}
};


const mapDispatchToProps = (dispatch) => {

	return {
    fetchRecordMedia: actions('Records', dispatch).fetchRecordMedia,
    loading: actions('Loading', dispatch).loading,
    loaded: actions('Loading', dispatch).loaded,
	}
}


// export default MediaContentItem;
export default connect(mapStateToProps, mapDispatchToProps)(MediaContentItem);
