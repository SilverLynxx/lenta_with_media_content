import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import { ApiProvider, apiService } from './admin/contexts';
// import { SearchProvider, searchService } from './contexts';
import { store } from './admin/storage';


import JavascriptTimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ru from 'javascript-time-ago/locale/ru';


import AdminPage from './admin';


JavascriptTimeAgo.locale(en);
JavascriptTimeAgo.locale(ru);


// ReactDOM.render(
//   <SearchProvider value={searchService}>
//   <ApiProvider value={apiService}>
//     <StoreProvider store={store}>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </StoreProvider>
//   </ApiProvider>
//   </SearchProvider>,
//   document.getElementById('root')
// );


ReactDOM.render(
  <ApiProvider value={apiService}>
    <StoreProvider store={store}>
      <AdminPage />
    </StoreProvider>
  </ApiProvider>,
  document.getElementById('root')
);

