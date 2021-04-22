import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Pokemon from './Pokemon';
import './css/PokemonList.scss';

const PokemonList = ({ typesFilters, abilityFilters }) => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
      .then(({ data }) => {
        setPokemons(data.results);
      });
  }, []);

  return (
    <ul className="pokemon-list">
      {pokemons.map((pokemon) => {
        return (
          <Pokemon
            key={pokemon.name}
            url={pokemon.url}
            typesFilters={typesFilters}
            abilityFilters={abilityFilters}
          />
        );
      })}
    </ul>
  );
};

PokemonList.propTypes = {
  typesFilters: PropTypes.arrayOf(PropTypes.string),
  abilityFilters: PropTypes.string,
};

PokemonList.defaultProps = {
  typesFilters: [],
  abilityFilters: 'all',
};

export default PokemonList;
