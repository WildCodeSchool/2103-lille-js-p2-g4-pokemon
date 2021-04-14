import { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemon from './Pokemon';
import './css/PokemonList.scss';

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0')
      .then((data) => {
        setPokemons(data.data.results);
      });
  }, []);
  return (
    <div className="pokemon-list">
      {pokemons.map((pokemon) => {
        return <Pokemon {...pokemon} />;
      })}
    </div>
  );
};

export default PokemonList;
