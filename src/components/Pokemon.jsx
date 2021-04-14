import { useState, useEffect } from 'react';
import axios from 'axios';
import propTypes from 'prop-types';
import './css/Pokemon.scss';

const Pokemon = ({ url }) => {
  /* Declaration of a variable with useState to store the return value of the
    call to the API (useSate initialized with an object that contains a default
    value for each variable used in the component) */
  const [infos, setinfos] = useState({
    sprites: {
      other: {
        'official-artwork': {
          front_default: '',
        },
      },
    },
    id: 0,
    name: 'undefined',
    types: [
      {
        type: {
          name: 'undefined',
        },
      },
    ],
  });

  /* Call the API with the url received in props to get the information of the
    Pokemon we want to display */
  useEffect(() => {
    axios.get(url).then(({ data }) => {
      setinfos(data);
    });
  }, []);

  return (
    <article className="pokemon">
      <img
        className="pokemon-image"
        // Pokemon Image Display
        src={infos.sprites.other['official-artwork'].front_default}
        alt="pokemon avatar"
      />
      {/* Pokemon Name Display */}
      <h2 className="pokemon-name">{infos.name}</h2>
      <div className="pokemon-id-type">
        {/* Pokemon ID Display */}
        <p className="pokemon-id">#{infos.id} - </p>
        {/* Pokemon first type Display */}
        <p className="pokemon-type">{infos.types[0].type.name}</p>
      </div>
      <div className="arrow-container">
        <img className="arrow" src="/img/arrow.svg" alt="right arrow" />
      </div>
    </article>
  );
};

Pokemon.propTypes = {
  url: propTypes.string,
};

Pokemon.defaultProps = {
  url: 'undefined',
};

export default Pokemon;
