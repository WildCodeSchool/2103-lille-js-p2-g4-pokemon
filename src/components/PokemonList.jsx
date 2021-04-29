import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Pokemon from './Pokemon';
import './css/PokemonList.scss';

const PokemonList = ({
  typesFilters,
  abilityFilters,
  heightFilters,
  weightFilters,
}) => {
  const [pokemons, setPokemons] = useState([]);
  const [query, setQuery] = useState('');
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0')
      .then(({ data }) => {
        setPokemons(data.results);
      });
  }, []);

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={handleQueryChange}
        placeholder=" Search your Pokemon by name..."
      />
      <ul className="pokemon-list">
        {pokemons
          .filter((pokemon) => {
            return pokemon.name.includes(query);
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
