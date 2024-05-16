import { useEffect, useState } from 'react';
import './css/films_list.css';
import Film from './Films';
import {RetrieveData} from './utils'


const INITIAL_PAGE = 1;
const FILMS_PER_PAGE = 6;

const INITIAL_FILTERS = {
  title: '',
  genres: [],
  yearRange: [1900, 2024],
  directors: [],
  language: [],
  duration: 0,
  punctuation: 0
};


function Filters({filters, setFilters}) {


  const genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Thriller', 'Crime', 'Sci-Fi'];
  const maxDuration = 240;
  const languages = ['Spanish', 'English', 'French', 'German', 'Italian', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Others ']
  const directors = ['Frank Darabont', 'Francis Ford Coppola', 'Christopher Nolan', 'Quentin Tarantino', 'Peter Jackson', 'Robert Zemeckis', 'David Fincher', 'Martin Scorsese'];
  const years = Array.from({ length: 74 }, (_, i) => 1950 + i);
  const years_reverse = Array.from({ length: 74 }, (_, i) => 2024 - i);

  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [yearRange, setYearRange] = useState([1950, 2024])



  const [selectedDirectors, setSelectedDirectors] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);

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
      
    if (name === 'start') {
      setYearRange([newYear, yearRange[1]]);
    } else {
      setYearRange([yearRange[0], newYear]);
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

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
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
      punctuation: selectedRating
    };

    setFilters(newFilters);

    // Reiniciar los filtros después de aplicarlos
    setSelectedTitle('');
    setSelectedGenres([]);
    setYearRange([1950, 2024]);
    setSelectedDirectors([]);
    setSelectedLanguages([]);
    setSelectedDuration(0);
    setSelectedRating(0);

    // Mensaje de confirmación
    alert('Filters applied successfully');

    //Reinicia la apariencia de los filtros
    
    setIsOpen(false);

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
      <input type="text" id="director" name="director" value={selectedDirectors} list="director-list" onChange={handleDirectorChange} />
      <datalist id="director-list">
        {renderOptions(directors)}
      </datalist>

      {/* Language filter */}
      <label htmlFor="language">Language:</label>
      <input type="text" id="language" name="language" value={selectedLanguages} list="language-list" onChange={handleLanguageChange} />
      <datalist id="language-list">
        {renderOptions(languages)}
      </datalist>

      {/* Year range filter */}
      <label htmlFor="year-range">Year Range:</label>
      <select name="start" id="start-year" value={yearRange[0]} onChange={handleYearRangeChange}>
        {renderOptions(years)}
      </select>
      <span> - </span>
      {console.log('Year range:', yearRange)}
      <select name="end" id="end-year" value={yearRange[1]} onChange={handleYearRangeChange}>
        {renderOptions(years_reverse)}
      </select>

      {/* Duration filter */}
      <div className='range-filters'>
        <label htmlFor="duration">Max duration:</label>
        <input type="range" id="duration" name="duration" min="0" max={maxDuration} step="10" value={selectedDuration} onChange={handleDurationChange} />
        <span>{selectedDuration} minutes</span>
      </div>

      {/* Rating filter */}
      <label htmlFor="rating">Rating:</label>
        <div style={{ display: 'flex' }} className='star-filter'>
          {[1, 2, 3, 4, 5].map((value) => (
            <span
              key={value}
              style={{ cursor: 'pointer', color: selectedRating >= value ? 'gold' : 'gray', fontSize: '24px', padding: '0 5px'}}
              onClick={() => handleRatingChange(value)}
            >
              ★
            </span>
          ))}
      </div>

      <button className='apply-filters' onClick={() => applyFilters()}>Apply filters</button>

    </div>
  );
}

function ErrorMsg() {
  return <div className='error_msg'>
    
    <h1 className='error_msg'> Ups! There are no movies that match your filters</h1>
    <h3> Please, try again or click the Apply filters button to restart your search </h3>
    
    </div>
}

function ListPage({filmList, currentPage, setCurrentPage, filters, setFilters}) {

  const [userData, errorData] = RetrieveData();

  const isLogged = ({errorData}) => {
      if (!errorData) {
        return true}
      else {
        return false;}
    }

  // Llamamos a la función isLogged para comprobar si el usuario está logueado
  const logged = isLogged({errorData});

  return <div className="container">

    {/* Dividimos la página en 2 partes, izquierda y derecha */}

    <h1>Movie Guide and Selection</h1>
    <h4>Don't forget to check out our filters area to find the perfect movie for you</h4>
      <div className="content">

        <div className="filters">
            <Filters filters={filters} setFilters={setFilters}/>
        </div>

        <div className="film-list">
            {filmList.length == 0 ? <ErrorMsg/> : <FilmList filmList={filmList} logged={logged} userData={userData}/>}
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

function FilmList({filmList, logged, userData}) {
  return (<div>
    {filmList.map(film =>
        <Film key={film.id} film={film} logged={logged} userData={userData} />
      )}
  </div>);
}


function App() {

  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE);
  const [filmList, setfilmList] = useState([]);
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  useEffect(() => {
    let skip = (currentPage - INITIAL_PAGE) * FILMS_PER_PAGE;



    const fetchFilms = async () => {
      try {

        const filterParams = new URLSearchParams();

        // Ajustes para añadir correctamente los filtros a la URL
        if (filters.title) filterParams.append('title__icontains', filters.title);
        if (filters.directors.length > 0) filterParams.append('director__icontains', filters.directors.join(','));
        if (filters.genres.length > 0) filterParams.append('genre__icontains', filters.genres.join(','));
        if (filters.yearRange[0]) filterParams.append('release_year__gte', filters.yearRange[0]);
        if (filters.yearRange[1]) filterParams.append('release_year__lte', filters.yearRange[1]);
        if (filters.duration) filterParams.append('length__lte', filters.duration);
        if (filters.punctuation) filterParams.append('rt_score__gte', filters.punctuation);
        if (filters.language.length > 0) filterParams.append('language__icontains', filters.language.join(','));


        // Si no hay filtros, lanzamos la URL base. Devolvemos todas las películas
        const baseUrl = `http://127.0.0.1:7000/?limit=${FILMS_PER_PAGE}&offset=${skip}`;
        const url = filterParams.toString() ? `${baseUrl}&${filterParams.toString()}` : baseUrl; // Cambio: URL condicional

        const response = await fetch(url);
        
        // Si hay error en la respuesta, lanzamos un error
        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de productos');
        }
        const data = await response.json();

        // Si no lo hay lanzamos la lista de productos
        setfilmList(data.results);

      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

  
  fetchFilms();
  console.log('Films', filmList);

  }, 
  
  [currentPage, filters]);

  return (
      // Le pasamos a ListPage el estado y función de cambio de filters
      <ListPage filmList={filmList} currentPage={currentPage} setCurrentPage={setCurrentPage} filters={filters} setFilters={setFilters}/>
  )
}

export default App
