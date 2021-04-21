import { useState } from 'react';
import './css/Homepage.scss';
import Filters from './Filters';
import PokemonList from './PokemonList';

const Homepage = () => {
  const [typesFilters, setTypesFilters] = useState([]);
  const [abilityFilters, setAbilityFilters] = useState('all');

  return (
    <div className="Homepage">
      <Filters
        setTypesFilters={setTypesFilters}
        setAbilityFilters={setAbilityFilters}
      />
      <PokemonList
        typesFilters={typesFilters}
        abilityFilters={abilityFilters}
      />
    </div>
  );
};

export default Homepage;
