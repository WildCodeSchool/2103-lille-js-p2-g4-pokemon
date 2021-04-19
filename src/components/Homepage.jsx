import { useState } from 'react';
import './css/Homepage.scss';
import Filters from './Filters';
import PokemonList from './PokemonList';

const Homepage = () => {
  const [typesFilters, setTypesFilters] = useState(['all']);

  return (
    <div className="Homepage">
      <Filters typesFilters={typesFilters} setTypesFilters={setTypesFilters} />
      <PokemonList typesFilters={typesFilters} />
    </div>
  );
};
export default Homepage;
