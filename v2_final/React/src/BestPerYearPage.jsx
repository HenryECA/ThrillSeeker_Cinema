import { useEffect, useState } from 'react';
import { render } from 'react-dom';
import './css/best_year.css';

import Film from './Films';


const renderStars = (rating) => {
  const stars = [];
  // Añadir una estrella por cada punto entero en la valoración
  for (let i = 0; i < Math.floor(rating); i++) {
    stars.push(<span key={i}>★</span>);
  }
  return stars;
};

function FilmList({filmList}) {
  return (<div>
    {filmList.map((film, index)=>
      <div key={film.id}>
          {/* add rating to title */}
          <h2 className='top'>Top {index + 1} - Rating: <span>{renderStars(film.rt_score)}</span></h2>
          <Film key={film.id} film={film} />
      </div>
      )}
  </div>);
}

function BestPerYearPage({filmList, yearfilter, setYearFilter}) {

  // let YEAR = new Date().getFullYear();
  const [year, setYear] = useState(yearfilter)
  const years = Array.from({length: 74}, (v, k) => 2024 - k);

    // Handle year change - Set new year value
    const handleYearChange = (e) => {
      setYear(e.target.value);
      setYearFilter(e.target.value);
    };

    const renderOptions = (list) => {
        return list.map((opt, index) => {
          return <option key={index} value={opt}>{opt}</option>;
        });
      }

    return (

        <div className='container'>

          <div className="best-year-rating">
              
              <h1>Best of {year}</h1>

              <div className="searcher">
              <label htmlFor="years">Year selection : </label>
              <select name="years" id="years" onChange={handleYearChange}>
              {renderOptions(years)}
              </select>
              </div>

              <p>Here are the best movies of {year}:</p>
              <FilmList filmList={filmList} />

          </div>
        </div>
    )
  }
  
  function App() {

    const [filmList, setfilmList] = useState([]);
    const [yearfilter , setYearFilter] = useState(2024);
  
  
    useEffect(() => {
      const fetchFilms = async () => {
        try {
          
          // Llamamos a la api con el año correspondiente
          // const response = await fetch(`http://127.0.0.1:8000/films/?release_year=${yearfilter}&ordering=-rt_score&limit=10`);
          // console.log(`http://127.0.0.1:8000/films/?release_year=${yearfilter}&ordering=-rt_score&limit=10`);

          const baseUrl = 'http://127.0.0.1:8000/films/';
  
          // Agregar filtros de año y ordenación
          const filterParams = new URLSearchParams();
          filterParams.append('release_year__gte', yearfilter);
          filterParams.append('release_year__lte', yearfilter);
          filterParams.append('ordering', '-rt_score');
          filterParams.append('limit', '10');
          const url = `${baseUrl}?${filterParams.toString()}`;

          const response = await fetch(url);
        
          // Si hay error en la respuesta, lanzamos un error
          if (!response.ok) {
            throw new Error('No se pudo obtener la lista de productos');
          }
          const data = await response.json();
  
          // Si no lo hay lanzamos la lista de productos
          setfilmList(data.results);
          console.log(`Data received:`, data);
  
        } catch (error) {
          console.error('Error al obtener los productos:', error);
        }
      };
  
    
    fetchFilms();
    }, [yearfilter]);
  
    return (

        <BestPerYearPage filmList={filmList} yearfilter={yearfilter} setYearFilter={setYearFilter}/>
    )
  }
  
  export default App