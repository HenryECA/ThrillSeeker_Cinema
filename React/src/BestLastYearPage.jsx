import { useEffect, useState } from 'react';
import { render } from 'react-dom';
import './css/rating.css';


function BestLastYearPage() {
    return (

        <div className='container'>
        <div className="rating">
            
            <h1>Best of 2023</h1>
            <p>Here are the best movies of 2023:</p>
            <ul>
                <li>Movie 1</li>
                <li>Movie 2</li>
                <li>Movie 3</li>
                <li>Movie 4</li>
                <li>Movie 5</li>
            </ul>
        </div>
        </div>
    )
  }
  
  export default BestLastYearPage;