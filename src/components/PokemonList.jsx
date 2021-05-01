import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Pokemon from './Pokemon';
import PokeSpinner from './PokeSpinner';
import './css/PokemonList.scss';

const PokemonList = ({
  typesFilters,
  abilityFilters,
  heightFilters,
  weightFilters,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [query, setQuery] = useState('');
  const [offset, setOffset] = useState('0');

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=100&offset=${offset}`)
      .then(({ data }) => {
        setPokemons(data.results);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [offset]);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleList = (e) => {
    setOffset(e.target.value);
    setQuery(query);
  };

  return (
    <>
      {isLoading && (
        <div className="list-loading">
          <PokeSpinner />
        </div>
      )}
      {!isLoading && error && <p>error</p>}
      {!isLoading && !error && (
        <>
          <input
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder=" Search your Pokemon by name..."
          />
          <select name="list-choice" id="list-choice" onChange={handleList}>
            <option value="0">1-99</option>
            <option value="99">100-199</option>
            <option value="199">200-299</option>
            <option value="299">300-399</option>
            <option value="399">400-499</option>
            <option value="499">500-599</option>
            <option value="599">600-699</option>
            <option value="699">700-799</option>
            <option value="799">800-898</option>
          </select>
          <ul className="pokemon-list">
            {pokemons
              .filter((pokemon) => {
                return pokemon.name.toUpperCase().includes(query.toUpperCase());
              })
              .map((pokemon) => {
                return (
                  <Pokemon
                    key={pokemon.name}
                    url={pokemon.url}
                    typesFilters={typesFilters}
                    abilityFilters={abilityFilters}
                    heightFilters={heightFilters}
                    weightFilters={weightFilters}
                  />
                );
              })}
          </ul>
        </>
      )}
    </>
  );
};

PokemonList.propTypes = {
  typesFilters: PropTypes.arrayOf(PropTypes.string),
  abilityFilters: PropTypes.string,
  heightFilters: PropTypes.string,
  weightFilters: PropTypes.string,
};

PokemonList.defaultProps = {
  typesFilters: [],
  abilityFilters: 'all',
  heightFilters: 'all',
  weightFilters: 'all',
};

export default PokemonList;
