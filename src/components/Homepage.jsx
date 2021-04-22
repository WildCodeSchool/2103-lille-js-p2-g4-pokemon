import { useState } from 'react';
import './css/Homepage.scss';
import Filters from './Filters';
import PokemonList from './PokemonList';

const Homepage = () => {
  const [typesFilters, setTypesFilters] = useState([]);
  const [abilityFilters, setAbilityFilters] = useState('all');
  const [heightFilters, setHeightFilters] = useState('all');
  const [weightFilters, setWeightFilters] = useState('all');

  return (
    <div className="Homepage">
      <Filters
        setTypesFilters={setTypesFilters}
        setAbilityFilters={setAbilityFilters}
        setHeightFilters={setHeightFilters}
        setWeightFilters={setWeightFilters}
      />
      <PokemonList
        typesFilters={typesFilters}
        abilityFilters={abilityFilters}
        heightFilters={heightFilters}
        weightFilters={weightFilters}
      />
    </div>
  );
};

export default Homepage;
