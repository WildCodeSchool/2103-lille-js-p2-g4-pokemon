import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Pokemon from './Pokemon';
import PokeSpinner from './PokeSpinner';
import Error from './Error';
import './css/PokemonList.scss';
import './css/searchbar.scss';

const PokemonList = ({
  typesFilters,
  abilityFilters,
  heightFilters,
  weightFilters,
}) => {
  const history = useHistory();
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

  const handleOffset = (e) => {
    setOffset(e.target.value);
    setQuery(query);
  };

  return (
    <>
      <input
        type="text"
        className="searchbar"
        value={query}
        onChange={handleQueryChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            history.push(`/name/${query}`);
          }
        }}
        placeholder=" Search your Pokemon by name or ID..."
      />
      <select name="list-choice" id="list-choice" onChange={handleOffset}>
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
      {isLoading && <PokeSpinner />}
      {!isLoading && error && (
        <Error kaomoji="( ᵒ̴̶̷̥́ _ᵒ̴̶̷̣̥̀ )" msg="Pokemons not found" />
      )}
      {!isLoading && !error && (
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
