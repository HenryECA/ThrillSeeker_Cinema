import { useEffect, useState } from 'react';
import { render } from 'react-dom';
import './css/best_year.css';



function BestPerYearPage() {

    let YEAR = new Date().getFullYear();
    const years = Array.from({length: 50}, (v, k) => YEAR - k);
    const [year, setYear] = useState(YEAR);
    const [movies, setMovies] = useState([]);

    // Handle year change
    const handleYearChange = (e) => {
        setYear(e.target.value);
    }

    const renderOptions = (list) => {
        return list.map((opt, index) => {
          return <option key={index} value={opt}>{opt}</option>;
        });
      }

    return (

        <div className='container'>
        
        <div className="searcher">
            <label htmlFor="years">Year selection : </label>
            <select name="years" id="years" onChange={handleYearChange}>
            {renderOptions(years)}
            </select>
        </div>

        <div className="rating">
            
            <h1>Best of {year}</h1>
            <p>Here are the best movies of {year}:</p>
            {/* <FilmList filmList={movies} /> */}

        </div>
        </div>
    )
  }
  
  export default BestPerYearPage;