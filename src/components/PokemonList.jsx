import { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemon from './Pokemon';
import './css/PokemonList.scss';

const PokemonList = () => {
  /* Declaration of a variable with useState to store the return value of the
    call to the API (useSate initialized with an empty array) */
  const [pokemons, setPokemons] = useState([]);

  /* Call the API to get the list of pokémons that we want to display on the
    Homepage (here the 50 first Pokemon) */
  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
      .then(({ data }) => {
        setPokemons(data.results);
      });
  }, []);

  return (
    <ul className="pokemon-list">
      {/* For each pokemon returned by the API and stored in the useState:
        "pokemons", call of the <Pokemon /> component with the API url of this
        one as props to display the Pokemon */}
      {pokemons.map((pokemon) => {
        return <Pokemon key={pokemon.name} url={pokemon.url} />;
      })}
    </ul>
  );
};

export default PokemonList;
