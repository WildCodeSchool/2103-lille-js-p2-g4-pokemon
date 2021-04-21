import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import colorTypes from '../colorTypes.json';
import './css/Pokemon.scss';

const Pokemon = ({ url, typesFilters, abilityFilters }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [infos, setinfos] = useState({
    abilities: [
      {
        ability: {
          name: 'Fatalfoutre',
        },
      },
    ],
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
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then(({ data }) => {
        setinfos(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (typesFilters.length !== 0) {
      for (let i = 0; i < infos.types.length; i += 1) {
        if (typesFilters.includes(infos.types[i].type.name)) {
          setDisplay(true);
          return true;
        }
      }
      setDisplay(false);
      return false;
    }
    if (
      abilityFilters !== 'all' &&
      !infos.abilities
        .map((element) => element.ability.name)
        .includes(abilityFilters)
    ) {
      setDisplay(false);
      return false;
    }
    setDisplay(true);
    return true;
  }, [typesFilters, abilityFilters]);

  return (
    <>
      {loading && <div className="loading" />}
      {error && <div className="error" />}
      {!loading && !error && display && (
        <li
          className="pokemon"
          style={{ backgroundColor: colorTypes[infos.types[0].type.name] }}
        >
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
        </li>
      )}
    </>
  );
};

Pokemon.propTypes = {
  url: PropTypes.string,
  typesFilters: PropTypes.arrayOf(PropTypes.string),
  abilityFilters: PropTypes.string,
};

Pokemon.defaultProps = {
  url: 'undefined',
  typesFilters: [],
  abilityFilters: 'all',
};

export default Pokemon;
