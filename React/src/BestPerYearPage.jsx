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
          <h2 className='top'>Top {index + 1} - Rating: <span>{renderStars(film.rating)}</span></h2>
          <Film key={film.id} film={film} />
      </div>
      )}
  </div>);
}

function BestPerYearPage({filmList, yearfilter, setYearFilter}) {

  // let YEAR = new Date().getFullYear();
  const [year, setYear] = useState(yearfilter)
  const years = Array.from({length: 50}, (v, k) => 2024 - k);

    // Handle year change - Set new year value
    const handleYearChange = (e) => {
        // console.log('New year', e.target.value);
        setYear(e.target.value);
        setYearFilter(e.target.value);

    }

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
  
          // JOAQUIN: Introducir fetch con filtrado por yearfilter y limit de 10 (estamos haciendo un top 10 de películas por año)
          // const response = await fetch(`https://dummyjson.com/products?limit=${FILMS_PER_PAGE}&skip=${skip}&${filterParams}`);
  
          const response = await fetch(`https://dummyjson.com/products`);
          
          // Si hay error en la respuesta, lanzamos un error
          if (!response.ok) {
            throw new Error('No se pudo obtener la lista de productos');
          }
          const data = await response.json();
  
          // Si no lo hay lanzamos la lista de productos
  
          // JOAQUIN : Aquí deberíamos cambiar data.products por el nombre de la lista de las películas que devuleves en la API
          setfilmList(data.products);
  
        } catch (error) {
          console.error('Error al obtener los productos:', error);
        }
      };
  
    
    fetchFilms();
  
    }, 
    
    [yearfilter]);
  
    return (

        <BestPerYearPage filmList={filmList} yearfilter={yearfilter} setYearFilter={setYearFilter}/>
    )
  }
  
  export default App