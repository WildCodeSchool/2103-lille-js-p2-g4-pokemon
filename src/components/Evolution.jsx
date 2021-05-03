import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import PokeSpinner from './PokeSpinner';
import Error from './Error';
import './css/Evolution.scss';
import './css/colorTypes.scss';

export default function Evolution({ name }) {
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
        <Link to={`/name/${infos.name}`}>
          <img
            className={`evolution-image ${infos.types[0].type.name}`}
            src={infos.sprites.other['official-artwork'].front_default}
            alt="pokemon avatar"
          />
          <p className="evolution-id">{infos.id}</p>
          <p className="evolution-name">{infos.name}</p>
        </Link>
      )}
    </li>
  );
}

Evolution.propTypes = {
  name: PropTypes.string,
};

Evolution.defaultProps = {
  name: '',
};
