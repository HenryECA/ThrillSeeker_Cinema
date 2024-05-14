import { useEffect, useState } from 'react';
import { render } from 'react-dom';
import './css/films_list.css';

import Filters from './Filters';
import Film from './Films';
import SearchBar from './SearchBar';


const INITIAL_PAGE = 1;
const FILMS_PER_PAGE = 6;

function ListPage({filmList, currentPage, setCurrentPage}) {
  return <div className="container">

    {/* Dividimos la página en 2 partes, izquierda y derecha */}

    <h1>Movie Guide and Selection</h1>
    <h4>Don't forget to check out our filters area to find the perfect movie for you</h4>
      <div className="content">

        <div className="filters">
            <Filters />
        </div>

        <div className="film-list">
            <FilmList filmList={filmList} />
            <PageFilter currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>
    </div>
  </div>

}

function PageFilter({currentPage, setCurrentPage}) {

  function changePage(page) {
    page = Math.max(1, page);
    setCurrentPage(page);
  }

  return <>
    <div className="buttons">
      <button onClick={() => changePage(currentPage - 1)} disabled={currentPage==INITIAL_PAGE}>&lt;</button>
      <input type="number" value={currentPage} onChange={(e) => changePage(e.target.value)}/>
      <button onClick={() => changePage(currentPage + 1)}>&gt;</button>
    </div>
  </>
}

function FilmList({filmList}) {
  return (<div>
    {filmList.map(film =>
        <Film key={film.id} film={film} />
      )}
  </div>);
}


function App() {
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const [filmList, setfilmList] = useState([]);

  useEffect(() => {
    let skip = (currentPage - INITIAL_PAGE) * FILMS_PER_PAGE;
    const fetchFilms = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products?limit=${FILMS_PER_PAGE}&skip=${skip}`);
        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de productos');
        }
        const data = await response.json();
        //console.log(data.products[0]);
        setfilmList(data.products);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchFilms();
  }, [currentPage]);

  return (
      <ListPage filmList={filmList} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
  )
}

export default App
