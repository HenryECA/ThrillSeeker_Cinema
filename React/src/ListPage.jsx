import { useEffect, useState } from 'react';
import { render } from 'react-dom';
import './css/films_list.css';

import Film from './Films';
import SearchBar from './SearchBar';


const INITIAL_PAGE = 1;
const FILMS_PER_PAGE = 6;

function Filters({filters, setFilters}) {

  // JOAQUIN : Cambia aquí las listas por los valores únicospara cada categoría que devuelves en la API
  const genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Thriller'];
  const maxDuration = 240;
  const languages = ['Spanish', 'English', 'French', 'German', 'Italian', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Others ']
  const directors = ['Steven Spielberg', 'Quentin Tarantino', 'Martin Scorsese', 'Pedro Almodóvar', 'Woody Allen'];

  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [yearRange, setYearRange] = useState([1900, 2024]);
  const [selectedDirectors, setSelectedDirectors] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState(0);
  const [selectedPunctuation, setSelectedPunctuation] = useState(0);

  const renderOptions = (list) => {
    return list.map((opt, index) => {
      return <option key={index} value={opt}>{opt}</option>;
    });
  }
  
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleGenreChange = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(prevGenres => prevGenres.filter(item => item !== genre));
    } else {
      setSelectedGenres(prevGenres => [...prevGenres, genre]);
    }

    console.log('Selected genres:', selectedGenres);
  };

  const handleYearRangeChange = (e) => {
    const { name, value } = e.target;
    const newYear = parseInt(value);
    const updatedYearRange = { ...yearRange, [name]: newYear };
    if (updatedYearRange.start > updatedYearRange.end) {
      // Si el año de inicio es mayor que el año de fin, ajustamos el año de fin para que sea igual al año de inicio
      setYearRange(prevRange => ({ ...prevRange, [name]: prevRange.start }));
    } else {
      setYearRange(updatedYearRange);
    }
};

  const handleDurationChange = (e) => {
    const duration = parseInt(e.target.value);
    setSelectedDuration(duration);
  };

  const handleDirectorChange = (e) => {
    const value = e.target.value;
    setSelectedDirectors(prevDirectors => {
      if (!prevDirectors.includes(value)) {
        return [...prevDirectors, value];
      }
      return prevDirectors;
    });
  };

  const handleLanguageChange = (e) => {
    const value = e.target.value;
    setSelectedLanguages(prevLanguages => {
      if (!prevLanguages.includes(value)) {
        return [...prevLanguages, value];
      }
      return prevLanguages;
    });
  };

  const handlePunctuationChange = (punctuation) => {
    setSelectedPunctuation(punctuation);
  };


  // Función que aplica los filtros
  const applyFilters = () => {

    const newFilters = {
      title: selectedTitle,
      genres: selectedGenres,
      yearRange: yearRange,
      directors: selectedDirectors,
      language: selectedLanguages,
      duration: selectedDuration,
      punctuation: selectedPunctuation
    };

    setFilters(newFilters);

  };


  return (
    <div >
      <h2>Filters Selection</h2>

      {/* Title filter */}
      <label htmlFor="title">Title:</label>
      <input type="text" id="title" name="title" value={selectedTitle} onChange={(e) => setSelectedTitle(e.target.value)} />

      {/* Genre filter */}
      <label htmlFor="genre">Genres:</label>
      <div style={{ position: 'relative', display: 'block' }}>
        <button onClick={toggleDropdown}>Selection</button>
        {isOpen && (
          <div className='genre-dropdown' >
            {genres.map((genre, index) => (
              <div key={index} style={{ display: 'block', marginRight: '10px' }}>
                <input
                  type="checkbox"
                  id={'genre-checkbox-${index}'}
                  name={'genre-checkbox-${index}'}
                  value={genre}
                  checked={selectedGenres.includes(genre)}
                  onChange={() => handleGenreChange(genre)}
                  style={{ marginRight: '5px' }}
                />
                <label htmlFor={'genre-checkbox-${index}'} style={{ fontSize: '0.9em', display: 'inline-block', verticalAlign: 'middle', marginRight: '5px' }}>{genre}</label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Director filter */}
      <label htmlFor="director">Director:</label>
      <input type="text" id="director" name="director" list="director-list" onChange={handleDirectorChange} />
      <datalist id="director-list">
        {renderOptions(directors)}
      </datalist>

      {/* Language filter */}
      <label htmlFor="language">Language:</label>
      <input type="text" id="language" name="language" list="language-list" onChange={handleLanguageChange} />
      <datalist id="language-list">
        {renderOptions(languages)}
      </datalist>

      {/* Year range filter */}
      <label htmlFor="year-range">Year Range:</label>
      <select name="start" id="start-year" value={yearRange.start} onChange={handleYearRangeChange}>
        {Array.from({length: 123}, (_, i) => 1900 + i).map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      <span> - </span>
      <select name="end" id="end-year" value={yearRange.end} onChange={handleYearRangeChange}>
        {Array.from({length: 123}, (_, i) => 1900 + i).map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>

      {/* Duration filter */}
      <div className='range-filters'>
        <label htmlFor="duration">Max duration:</label>
        <input type="range" id="duration" name="duration" min="0" max={maxDuration} step="10" value={selectedDuration} onChange={handleDurationChange} />
        <span>{selectedDuration} minutes</span>
      </div>

      {/* Punctuation filter */}
      <label htmlFor="punctuation">Rating:</label>
        <div style={{ display: 'flex' }} className='star-filter'>
          {[1, 2, 3, 4, 5].map((value) => (
            <span
              key={value}
              style={{ cursor: 'pointer', color: selectedPunctuation >= value ? 'gold' : 'gray', fontSize: '24px', padding: '0 5px'}}
              onClick={() => handlePunctuationChange(value)}
            >
              ★
            </span>
          ))}
      </div>

      <button className='apply-filters' onClick={() => applyFilters()}>Apply filters</button>

    </div>
  );
}

function ListPage({filmList, currentPage, setCurrentPage, filters, setFilters}) {
  return <div className="container">

    {/* Dividimos la página en 2 partes, izquierda y derecha */}

    <h1>Movie Guide and Selection</h1>
    <h4>Don't forget to check out our filters area to find the perfect movie for you</h4>
      <div className="content">

        <div className="filters">
            <Filters filters={filters} setFilters={setFilters}/>
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

  // JOAQUIN - Cambia los valores de los filtros aquí por algo genérico que devuelvas en la API
  // para que el primer filtrado no esté vacío
  const [filters, setFilters] = useState({
    title: '',
    genres: [],
    yearRange: '',
    director: '',
    language: '',
    duration: 0,
    punctuation: 0
  });


  useEffect(() => {
    let skip = (currentPage - INITIAL_PAGE) * FILMS_PER_PAGE;

    const fetchFilms = async () => {
      try {

        // JOAQUIN: Accedemos a los filtros y los pasamos a la URL para buscar en la API con ellos
        // const filterParams = new URLSearchParams(filters).toString();
        // const response = await fetch(`https://dummyjson.com/products?limit=${FILMS_PER_PAGE}&skip=${skip}&${filterParams}`);

        const response = await fetch(`https://dummyjson.com/products?limit=${FILMS_PER_PAGE}&skip=${skip}`);
        
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
  console.log('Filters:', filters);

  }, 
  
  [currentPage, filters]);

  return (
      // Le pasamos a ListPage el estado y función de cambio de filters
      <ListPage filmList={filmList} currentPage={currentPage} setCurrentPage={setCurrentPage} filters={filters} setFilters={setFilters}/>
  )
}

export default App
