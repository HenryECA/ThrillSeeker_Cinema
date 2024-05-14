import React, { useState } from 'react';

export default function Filters() {

    // Change for a call to the unique categories in the API
    const genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Thriller'];
    const categories = ['Films', 'Series', 'Documentaries', 'Short Films', 'Animations', 'TV Shows', 'Music Videos', 'Trailers', 'Video Games', 'Others' ];
    const maxDuration = 240;
    const languages = ['Spanish', 'English', 'French', 'German', 'Italian', 'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Others ']
    const directors = ['Steven Spielberg', 'Quentin Tarantino', 'Martin Scorsese', 'Pedro Almodóvar', 'Woody Allen'];
  
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
  
  
    return (
      <div >
        <h2>Filters Selection</h2>
  
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