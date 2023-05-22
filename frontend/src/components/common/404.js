
import React from 'react';
import './404.css'; 


const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <h1 className='not-h1'>Oops!</h1>
        <h2 className='not-h2'>Looks like you've taken a wrong turn</h2>
        <p className="not-p">
          Don't worry, our food fairies are on the lookout for your missing page. They'll find a way to turn that 404 error into a delightful feast for someone in need!
        </p>
   
        <a href="/home" className="back-to-home">Go back to Home</a>
      </div>
    </div>
  );
}

export default NotFoundPage;
