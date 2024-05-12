import { useEffect, useState } from 'react';
import { render } from 'react-dom';


const INITIAL_PAGE = 1;
const FILMS_PER_PAGE = 6;

function ListPage({filmList, currentPage, setCurrentPage}) {
  return <div className="container">

    <h2>Our recommendations</h2>

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

function Filters() {
  const genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Thriller'];
  const categories = ['Films', 'Series', 'Documentaries', 'Short Films', 'Animations', 'TV Shows', 'Music Videos', 'Trailers', 'Video Games', 'Others' ];
  const maxDuration = 240;
  const languages = ['Spanish', 'English', 'French', 'German', 'Italian', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Others ']
  const directors = ['Steven Spielberg', 'Quentin Tarantino', 'Martin Scorsese', 'Pedro Almodóvar', 'Woody Allen'];
  // get directors from database

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [yearRange, setYearRange] = useState([1900, 2022]);
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
  };
  const handleYearRangeChange = (e) => {
    // Implementa la lógica para actualizar el rango de años
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


  return (
    <div>
      <h3>Filters</h3>

      <label htmlFor="category">Category:</label>
      <select name="category" id="category">
      <option value="all">All</option>
        {renderOptions(categories)}
      </select>

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

      <label htmlFor="director">Director:</label>
      <input type="text" id="director" name="director" list="director-list" onChange={handleDirectorChange} />
      <datalist id="director-list">
        {renderOptions(directors)}
      </datalist>

      <label htmlFor="language">Language:</label>
      <input type="text" id="language" name="language" list="language-list" onChange={handleLanguageChange} />
      <datalist id="language-list">
        {renderOptions(languages)}
      </datalist>

      <label htmlFor="duration">Max duration:</label>
      <input type="range" id="duration" name="duration" min="0" max={maxDuration} step="10" value={selectedDuration} onChange={handleDurationChange} />
      <span>{selectedDuration} minutes</span>


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
    </div>
  );
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

function Film({film}) {

  const renderStars = () => {
    const stars = [];
    // Añadir una estrella por cada punto entero en la valoración
    for (let i = 0; i < Math.floor(film.rating); i++) {
      stars.push(<span key={i}>★</span>);
    }
    return stars;
  };


  return (
    <div className="film-details" id="filmDetails">
      <img src={film.thumbnail} alt="Thumbnail" id="thumbnail" />
      <div className="info">

        <h2> Película </h2>

        {/* Introducir nombre de la película */}
        {/* <h2>{film.name}</h2> */}

        {/* Introducir director */}
        {/* <p>
          <strong>Director:</strong> <span>{film.director}</span>
        </p> */}

        {/* Introducir actores */}
        {/* <p>
          <strong>Actors:</strong> <span>{film.actors}</span>
        </p> */}

        {/* Introducir duración */}
        {/* <p>
          <strong>Duration:</strong> <span>{film.duration} minutos</span>
        </p> */}

        <p>{film.description}</p>
        <p>
          <strong>Precio:</strong><span>{film.price}€</span>
        </p>
        <p>
          <strong>Stock:</strong> <span>{film.stock}</span>
        </p>
        <p>
          {/* Introducir cuando tengamos la valoración media */}
          <strong>Rating:</strong> <span>{renderStars()}</span>
        </p>


      </div>
    </div>)
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
