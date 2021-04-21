import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import colorTypes from '../colorTypes.json';

export default function FiltersTypes({ setTypesFilters }) {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://pokeapi.co/api/v2/type')
      .then(({ data }) => {
        setTypes(data.results);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleActiveFilter = (e) => {
    e.target.classList.toggle('filter-active');
  };

  const handleTypes = () => {
    const selectedTypes = [];
    const activeTypes = document.querySelectorAll(
      '.filters-type.filter-active'
    );

    activeTypes.forEach((type) => {
      selectedTypes.push(type.dataset.value);
    });
    setTypesFilters(selectedTypes);
  };

  return (
    <>
      {loading && <div className="pokespinner" />}
      {error && <div className="error" />}
      {!loading && !error && (
        <ul className="filters-types">
          {types.map((type) => {
            return (
              type.name !== 'unknown' &&
              type.name !== 'shadow' && (
                <li key={type.name}>
                  <button
                    type="button"
                    data-type="type"
                    data-value={type.name}
                    className="filters-type"
                    onClick={(e) => {
                      handleActiveFilter(e);
                      handleTypes();
                    }}
                    style={{ backgroundColor: colorTypes[type.name] }}
                  >
                    {type.name}
                  </button>
                </li>
              )
            );
          })}
        </ul>
      )}
    </>
  );
}

FiltersTypes.propTypes = {
  setTypesFilters: PropTypes.func,
};

FiltersTypes.defaultProps = {
  setTypesFilters: () => {},
};
