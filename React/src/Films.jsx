import React from 'react';

export default function Film({film}) {

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