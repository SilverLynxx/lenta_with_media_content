import React from 'react';
import AdminPageView from './view';
import TableScreen from './components/table_screen';


import './styles/main.css';
import './styles/table_screen.css';


const AdminPage = (props) => {

  const content = <TableScreen />;

  return (
    <AdminPageView content={content} />)
};

export default AdminPage;