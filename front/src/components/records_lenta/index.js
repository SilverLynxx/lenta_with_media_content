import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../actions';
import { ApiContext } from '../../contexts';
import RecordItem from '../record_item';
import Loading from '../loading';
import RecordsLentaView from './view';


const RecordsLenta = (props) => {

  const {
    recordsLenta,
    fetchRecordsLenta } = props;

  const apiService = React.useContext(ApiContext);

  const [loaded, changeLoaded] = React.useState(false);



  const loadContent = () => {
    apiService.get_subscriptions_records()
    .then(r => {
      const res = r.data.data.map(item => {
        return {
          recordid: item.recordid,
          recordHeadline: item.record_headline,
          username: item.username,
          postDate: item.post_date,
          recordText: item.record_text}});
      fetchRecordsLenta(res);
      if (!loaded) {
        changeLoaded(true)} })
    .catch(r => {
      console.log(r);
      if (!loaded) {
        changeLoaded(true)} });
  };


  React.useEffect(() => {
    if (loaded) {
      const interval = setInterval(() => {
        loadContent();
      }, 30*1000);
      return () => {
        clearInterval(interval);
      }
    };
  }, [loaded,])


  const handleRefresh = (e) => {
    e.preventDefault();
    loadContent();
  };

  if (loaded) {

    const recordsItemsList = recordsLenta.map(item => <RecordItem key={item.recordid} {...item}/>)


    return (
      <RecordsLentaView {...{
        recordsItemsList,
        handleRefresh }}/>);
  } else {

    loadContent();

    return <Loading />;
  }
};


const mapStateToProps = (store)=> {

  return {
    recordsLenta: store.records.recordsLenta,
  }
}

const mapDispatchToProps = (dispatch)=> {

  const dispatchActions = actions('Records', dispatch);

  return {
    fetchRecordsLenta: dispatchActions.fetchRecordsLenta,
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(RecordsLenta)