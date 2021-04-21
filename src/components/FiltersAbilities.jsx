import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export default function FiltersAbilities({ setAbilityFilters }) {
  const [abilities, setAbilities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('https://pokeapi.co/api/v2/ability?offset=0&limit=266')
      .then(({ data }) => {
        setAbilities(data.results);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleAbility = (e) => {
    const selectBox = e.target;

    setAbilityFilters(selectBox.options[selectBox.selectedIndex].value);
  };

  return (
    <>
      {isLoading && <div className="pokespinner" />}
      {error && <div className="error" />}
      {!isLoading && !error && (
        <select
          name="Abilities"
          id="abilitySelect"
          onChange={(e) => {
            handleAbility(e);
          }}
        >
          <option value="all">all</option>
          {abilities.map((ability) => (
            <option key={ability.name} value={ability.name}>
              {ability.name}
            </option>
          ))}
        </select>
      )}
    </>
  );
}

FiltersAbilities.propTypes = {
  setAbilityFilters: PropTypes.func,
};

FiltersAbilities.defaultProps = {
  setAbilityFilters: () => {},
};