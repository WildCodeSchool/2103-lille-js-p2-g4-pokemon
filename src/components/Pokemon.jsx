import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import propTypes from 'prop-types';
import colorTypes from '../colorTypes.json';
import './css/Pokemon.scss';

const Pokemon = ({ url }) => {
  /* Declaration of a variable with useState to store the return value of the
    call to the API (useSate initialized with an object that contains a default
    value for each variable used in the component) */
  const [infos, setinfos] = useState({
    sprites: {
      other: {
        'official-artwork': {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png',
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
    <li
      className="pokemon"
      style={{ backgroundColor: colorTypes[infos.types[0].type.name] }}
    >
      <Link to={`/${infos.name}`}>
        <img
          className="pokemon-image"
          src={infos.sprites.other['official-artwork'].front_default}
          alt="pokemon avatar"
        />
        <div className="pokemon-infos">
          <h2 className="pokemon-name">
            {infos.name.charAt(0).toUpperCase() + infos.name.slice(1)}
          </h2>
          <p className="pokemon-id">
            #
            {infos.id.toLocaleString('en-US', {
              minimumIntegerDigits: 3,
              useGrouping: false,
            })}
          </p>
          <p className="pokemon-types">
            {infos.types.map((element) => element.type.name).join(' - ')}
          </p>
        </div>
        <div className="arrow-container">
          <img className="arrow" src="/img/arrow.svg" alt="right arrow" />
        </div>
      </Link>
    </li>
  );
};

Pokemon.propTypes = {
  url: propTypes.string,
};

Pokemon.defaultProps = {
  url: 'undefined',
};

export default Pokemon;
