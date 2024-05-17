import React from 'react';
import {RetrieveData, UpdateFilmReview} from './utils';
import { useEffect, useState } from 'react';



function updateRating({film,userData, setRating}){

  // Comprobar si el usuario ya ha valorado la película -> Cambiar a nuestra implementación
  console.log(film);
  
  if (userData.username in film.user_reviews){
    const update = window.confirm(`You have already rated this film with a ${film.user_reviews[userData.username]}. Do you want to update your rating?`);
    if(!update)
      return;
  }

  const rating = prompt("Register your new rating for this film (0-5):");
  if(rating === null) 
    return;
  
  // Comprobar que el valor introducido es un número entre 0 y 100
  if(isNaN(rating) || rating < 0 || rating > 5){
    alert("Invalid rating introduced! Please introduce a number between 0 and 5");
    return;
  }

  const newRating = {
    user: userData.username,
    film: film.title,
    rating: rating
  }

  // Implementar lógica de fetch a la api

  let resFilm = UpdateFilmReview(film.title, userData.username, rating)

  // Actualizar la valoración de la película
  film.user_reviews[userData.username] = rating;

  // Calcular la nueva media de valoración
  let sum = 0;
  for (const user in film.user_reviews){
    sum += film.user_reviews[user];
  }

  film.rt_score = sum / Object.keys(film.user_reviews).length;

  setRating(film.rt_score);

  return
}

export default function Film({film, logged, userData}) {

    const [rating, setRating] = useState(film.rt_score);

    const renderStars = () => {
      // Añadir una estrella por cada punto entero en la valoración
      const stars = Math.round(rating);
      return '★'.repeat(stars) + '☆'.repeat(5 - stars);

    };

    return (
      <div className="film-details" id="filmDetails">
        <img src={film.img_link} alt="Thumbnail" id="thumbnail" />
        <div className="info">
  
  
          {/* Introducir nombre de la película */}
          <p>
            <strong>"<span>{film.title}</span>"</strong>
          </p> 
  
          {/* Introducir director */}
          <p>
            <strong>Director:</strong> <span>{film.director}</span>
          </p> 
  
          {/* Introducir actores */}
          <p>
            <strong>Actors:</strong>
            
            <span>{film.actors.map((actor, index) => (
              <React.Fragment key={actor}>
                {index > 0 && " , "}
                {actor}
              </React.Fragment>
            ))}</span>
          </p>
  
          {/* Introducir duración */}
          <p>
            <strong>Duration:</strong> <span>{film.length}</span>
          </p>

          <p>
            <strong>Genre:</strong> <span>{film.genre}</span>
          </p>

          <p>
            <strong>Language:</strong> <span>{film.language}</span>
          </p>

          <p>
            <strong>Release year:</strong> <span>{film.release_year}</span>
          </p>
  
          <p>
            <strong>Summary: </strong><span>{film.summary}</span>
          </p>

          <p>
            {/* Introducir cuando tengamos la valoración media */}
            <strong>Avg. Rating:</strong> <span>{logged ? renderStars(): "Login / Register to see rating!"}</span>
          </p>

          {/* Botón de rating solo para usuarios */}
          {logged ? <button className='user-button' onClick={() => updateRating({film, userData, setRating})}>Rate this film</button> : null}

  
        </div>
      </div>)
  }