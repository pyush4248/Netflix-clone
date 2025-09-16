import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef(null);

  // API call 
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNGZlMTY0ZTk0MGNlMzI5MTMyOWRhMjc5NDNlY2ViNyIsIm5iZiI6MTc1Nzk0OTEzNC44ODk5OTk5LCJzdWIiOiI2OGM4MmNjZWY4YTRmYTdiMjljYTczOWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.clk4gPtYs00jAft-dy2UREtR7d2B3IAtmfkUZlAP8b0'
    }
  };


  // API call end 

  const handelWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => {
        setApiData(res.results);
        console.log(res);
      })
      .catch(err => console.error(err));

    if (!cardsRef.current) return;

    const cardDiv = cardsRef.current;
    cardDiv.addEventListener('wheel', handelWheel);

    return () => {
      cardDiv.removeEventListener('wheel', handelWheel);
    };
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`}className="card" key={index}>
            <img src={'https://image.tmdb.org/t/p/w500/' + card.poster_path} alt={card.title} />
            <p>{card.title}</p>
          </Link>
        })}
      </div>
    </div>
  );
};

export default TitleCards;
