import React from 'react';



const AdminPageView = (props) => {

  const {
    content } = props;

  return (
    <div className="admin-page">
      <div className="admin-page__content">
        { content }
      </div>
    </div>)
};

export default AdminPageView;