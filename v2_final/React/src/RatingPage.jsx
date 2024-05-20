import { useEffect, useState } from 'react';
import { render } from 'react-dom';
import './css/rating.css';



function RatingFilm({film}) {

    const renderStars = (rating) => {
      // Añadir una estrella por cada punto entero en la valoración
      const stars = Math.round(rating);
      console.log(rating);
      return '★'.repeat(stars) + '☆'.repeat(5 - stars);

    };

    return (
      <div className="film-details" id="filmDetails">
        <img src={film.img_link} alt="Thumbnail" id="thumbnail" />
        <div className="info">
          <p>
            <strong>"<span>{film.title}</span>"</strong>
          </p> 
          <p>
            <strong>Director:</strong> <span>{film.director}</span>
          </p> 
          <p>
            <strong>Rating:</strong> <span>{renderStars(film.rt_score)}</span>
          </p>
        </div>
      </div>)
}


function FilmList({filmList}) {
    return (<div>

      {filmList.map((film, index)=>
        <div key={film.id} className='film'>
            <h2 className='top'>Top {index + 1}</h2>
            <RatingFilm key={film.id} film={film} />
        </div>
        )}
    </div>);
}

function RatingPage({filmList}) {
    return (
        <div className='container'>
            <h1>Overall Top 10 Ranking</h1>
            <p>These are the best movies registered in our site:</p>
            <p>To be able to rate them and leave your opinion on our website just register and start rating!</p>
            {console.log(filmList)}
            <div className="rating">
            <FilmList filmList={filmList} />
            </div>
        </div>
    )
  }
  
function App() {

    const [filmList, setfilmList] = useState([]);

    useEffect(() => {
        const fetchFilms = async () => {
        try {
        
            const baseUrl = 'http://127.0.0.1:8000/films/';
            console.log('Fetching films from:', baseUrl);

            // Agregar filtros de año y ordenación
            const filterParams = new URLSearchParams();
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
    }, []);

    return (

        <RatingPage filmList={filmList}/>
    )
    }

export default App