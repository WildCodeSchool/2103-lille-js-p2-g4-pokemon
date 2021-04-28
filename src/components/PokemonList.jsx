import { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemon from './Pokemon';
import './css/PokemonList.scss';

const PokemonList = () => {
  /* Declaration of a variable with useState to store the return value of the
    call to the API (useSate initialized with an empty array) */
  const [pokemons, setPokemons] = useState([]);
  const [query, setQuery] = useState('a');

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  /* Call the API to get the list of pokémons that we want to display on the
    Homepage (here the 50 first Pokemon) */
  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=50&offset=0')
      .then(({ data }) => {
        setPokemons(data.results);
      });
  }, []);

  return (
    <>
      <input type="text" value={query} onChange={handleQueryChange} />
      <ul className="pokemon-list">
        {pokemons
          .filter((pokemon) => {
            return pokemon.name.includes(query);
          })
          .map((pokemon) => {
            return <Pokemon key={pokemon.name} url={pokemon.url} />;
          })}
      </ul>
    </>
  );
};

export default PokemonList;
