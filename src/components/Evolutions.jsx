import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Pokemon from './Pokemon';
import './css/Evolutions.scss';

const Evolutions = ({ chain }) => {
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    if (chain) {
      axios.get(chain).then(({ data }) => {
        // setPokemons([data.chain.evolves_to[0].species]);
        const pokArray = [];
        data.chain.evolves_to.forEach((evol) => {
          pokArray.push(evol.species);
        });
        setPokemons(pokArray);
      });
    }
  }, [chain]);

  return (
    <>
      <h2>Evolutions</h2>
      <ul className="pokemon-list">
        {pokemons.map((pokemon) => {
          return (
            <Pokemon
              key={pokemon.name}
              url={`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`}
            />
          );
          // return <li key={pokemon.name}>{pokemon.name}</li>;
        })}
      </ul>
    </>
  );
};

Evolutions.propTypes = {
  chain: PropTypes.string,
};

Evolutions.defaultProps = {
  chain: '',
};

export default Evolutions;
