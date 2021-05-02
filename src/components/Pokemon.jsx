import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import 'animate.css';
import PokeSpinner from './PokeSpinner';
import Error from './Error';
import './css/Pokemon.scss';
import './css/colorTypes.scss';

const Pokemon = ({
  url,
  typesFilters,
  abilityFilters,
  heightFilters,
  weightFilters,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [infos, setinfos] = useState({
    abilities: [
      {
        ability: {
          name: '',
        },
      },
    ],
    height: 0,
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
    weight: 0,
  });
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then(({ data }) => {
        const newData = data;
        newData.id = `#${data.id.toLocaleString('en-US', {
          minimumIntegerDigits: 3,
          useGrouping: false,
        })}`;
        setinfos(newData);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const displayType = () => {
    if (typesFilters.length !== 0) {
      for (let i = 0; i < infos.types.length; i += 1) {
        if (typesFilters.includes(infos.types[i].type.name)) {
          return true;
        }
      }
      return false;
    }
    return true;
  };

  const displayAbility = () => {
    if (
      abilityFilters !== 'all' &&
      !infos.abilities
        .map((element) => element.ability.name)
        .includes(abilityFilters)
    ) {
      return false;
    }
    return true;
  };

  const displayHeight = () => {
    if (heightFilters === 'small') {
      return infos.height < 10;
    }
    if (heightFilters === 'medium') {
      return infos.height >= 10 && infos.height <= 20;
    }
    if (heightFilters === 'big') {
      return infos.height > 20;
    }
    return true;
  };

  const displayWeight = () => {
    if (weightFilters === 'light') {
      return infos.weight < 1000;
    }
    if (weightFilters === 'medium') {
      return infos.weight >= 1000 && infos.weight <= 3000;
    }
    if (weightFilters === 'heavy') {
      return infos.weight > 3000;
    }
    return true;
  };

  useEffect(() => {
    setDisplay(
      displayType() && displayAbility() && displayHeight() && displayWeight()
    );
  }, [typesFilters, abilityFilters, heightFilters, weightFilters]);

  return (
    display && (
      <>
        {loading && (
          <li className="spinner-error-card">
            <PokeSpinner />
          </li>
        )}
        {!loading && error && (
          <li className="spinner-error-card">
            <Error kaomoji="( ᵒ̴̶̷̥́ _ᵒ̴̶̷̣̥̀ )" msg="Pokemon not found" />
          </li>
        )}
        {!loading && !error && infos.id && (
          <li
            className={`pokemon ${infos.types[0].type.name} animate__animated animate__zoomIn`}
          >
            <Link to={`/name/${infos.name}`}>
              <img
                className="pokemon-image"
                src={infos.sprites.other['official-artwork'].front_default}
                alt="pokemon avatar"
              />
              <div className="pokemon-infos">
                <h2 className="pokemon-name">{infos.name}</h2>
                <p className="pokemon-id">{infos.id}</p>
                <p className="pokemon-types">
                  {infos.types.map((element) => element.type.name).join(' - ')}
                </p>
              </div>
              <div className="arrow-container">
                <img className="arrow" src="/img/arrow.svg" alt="right arrow" />
              </div>
            </Link>
          </li>
        )}
      </>
    )
  );
};

Pokemon.propTypes = {
  url: PropTypes.string,
  typesFilters: PropTypes.arrayOf(PropTypes.string),
  abilityFilters: PropTypes.string,
  heightFilters: PropTypes.string,
  weightFilters: PropTypes.string,
};

Pokemon.defaultProps = {
  url: 'undefined',
  typesFilters: [],
  abilityFilters: 'all',
  heightFilters: 'all',
  weightFilters: 'all',
};

export default Pokemon;
