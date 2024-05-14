import { useEffect, useState } from 'react';
import { render } from 'react-dom';
import './css/rating.css';


function RatingPage() {
    return (
        <div className='container'>
        <div className="rating">

            <h1>Rating</h1>
            <p>Rate this movie:</p>
            
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
        </div>
        </div>
    )
  }
  
  export default RatingPage;