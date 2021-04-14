import { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Pokemon.scss';
import propTypes from 'prop-types';

const Pokemon = ({ name, url }) => {
  const [stats, setStats] = useState({});
  useEffect(() => {
    axios.get(url).then((data) => {
      setStats(data.data);
    });
  }, []);
  return (
    <article className="pokemon">
      <img
        className="pokemon-image"
        src="/img/bulbasaur.png"
        alt="pokemon avatar"
      />
      <h2 className="pokemon-name">{name}</h2>
      <div className="pokemon-id-type">
        <p className="pokemon-id">#{stats.id} - </p>
        <p className="pokemon-type">type</p>
      </div>
      <div className="arrow-container">
        <img className="arrow" src="/img/arrow.svg" alt="right arrow" />
      </div>
    </article>
  );
};

Pokemon.propTypes = {
  name: propTypes.string,
  url: propTypes.string,
};

Pokemon.defaultProps = {
  name: 'pikachu',
  url: ' ',
};

export default Pokemon;
