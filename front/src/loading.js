


import '../styles/_loading_initial.css';
import '../styles/css_loader.css';


const rootLoading = document.getElementById('root-loading');

rootLoading.innerHTML = `


    <div class="_loading-initial">
       <div class="cssload-loader-container">
         <div class="cssload-loader">
          <div class="cssload-inner cssload-one"></div>
          <div class="cssload-inner cssload-two"></div>
          <div class="cssload-inner cssload-three"></div>
        </div>
      </div>
    </div>
`;

window.onload = (() => {

  const e1 = document.querySelector('.cssload-loader-container');
  e1.classList.add('hide');
  setTimeout(() => {
    const e2 = document.querySelector('._loading-initial');
    e1.classList.add('hidden');
    e1.classList.remove('hide');
    e2.classList.add('hide');
    setTimeout(() => {
      rootLoading.innerHTML = '';
    }, 500)
  }, 500)
 });


    // <div className="_loading-initial">
    //   { cssLoader }
    // </div>



    // <div className="cssload-loader">
    //   <div className="cssload-inner cssload-one"></div>
    //   <div className="cssload-inner cssload-two"></div>
    //   <div className="cssload-inner cssload-three"></div>
    // </div>)