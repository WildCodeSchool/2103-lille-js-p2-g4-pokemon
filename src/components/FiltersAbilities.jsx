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

  return (
    <>
      {!isLoading && error && <p>error</p>}
      {!isLoading && !error && (
        <div className="select-ability">
          <h2>Ability</h2>
          <select
            name="abilities"
            id="abilitySelect"
            onChange={(e) => {
              setAbilityFilters(e.target.value);
            }}
          >
            <option value="all">all</option>
            {abilities.map((ability) => (
              <option key={ability.name} value={ability.name}>
                {ability.name}
              </option>
            ))}
          </select>
        </div>
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
