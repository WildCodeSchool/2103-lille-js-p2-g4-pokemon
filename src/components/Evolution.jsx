import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import PokeSpinner from './PokeSpinner';
import Error from './Error';
import './css/Evolution.scss';
import './css/colorTypes.scss';

export default function Evolution({ name, length, index }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [infos, setInfos] = useState({
    sprites: {
      other: {
        'official-artwork': {
          front_default: '',
        },
      },
    },
    id: null,
    name: '',
    types: [
      {
        type: {
          name: '',
        },
      },
    ],
  });

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(({ data }) => {
        const newData = data;
        newData.id = `#${data.id.toLocaleString('en-US', {
          minimumIntegerDigits: 3,
          useGrouping: false,
        })}`;
        setInfos(newData);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <li className="Evolution">
      {isLoading && <PokeSpinner />}
      {!isLoading && error && (
        <Error kaomoji="( ᵒ̴̶̷̥́ _ᵒ̴̶̷̣̥̀ )" msg="Evolution not found" />
      )}
      {!isLoading && !error && (
        <>
          <Link to={`/name/${infos.name}`}>
            <img
              className={`evolution-image ${infos.types[0].type.name}`}
              src={infos.sprites.other['official-artwork'].front_default}
              alt="pokemon avatar"
            />
            <p className="evolution-id">{infos.id}</p>
            <p className="evolution-name">{infos.name}</p>
          </Link>
          {index < length - 1 && (
            <svg
              width="80px"
              height="80px"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.46 18a2.23 2.23 0 0 1-.91-.2 1.76 1.76 0 0 1-1.05-1.59V7.79A1.76 1.76 0 0 1 9.55 6.2a2.1 2.1 0 0 1 2.21.26l5.1 4.21a1.7 1.7 0 0 1 0 2.66l-5.1 4.21a2.06 2.06 0 0 1-1.3.46zm0-10v7.9l4.86-3.9z" />
            </svg>
          )}
        </>
      )}
    </li>
  );
}

Evolution.propTypes = {
  name: PropTypes.string.isRequired,
  length: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};
