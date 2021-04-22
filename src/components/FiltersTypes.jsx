import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './css/colorTypes.scss';

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

  const handleActiveFilter = (e, typeName) => {
    e.target.classList.toggle('active');
    e.target.classList.toggle(typeName);
  };

  const handleTypes = () => {
    const selectedTypes = [];
    const activeTypes = document.querySelectorAll('.button-types.active');

    activeTypes.forEach((type) => {
      selectedTypes.push(type.dataset.value);
    });
    setTypesFilters(selectedTypes);
  };

  const resetFiltersTypes = () => {
    const activeTypes = document.querySelectorAll('.button-types');

    activeTypes.forEach((button) => {
      button.classList.remove(...button.classList);
      button.classList.add('button-types');
    });
    setTypesFilters([]);
  };

  return (
    <>
      {loading && <div className="pokespinner" />}
      {error && <div className="error" />}
      {!loading && !error && (
        <div className="types-container">
          <div className="filters-name">
            <h1>Types</h1>
            <button
              type="button"
              className="button-types-refresh"
              onClick={resetFiltersTypes}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
              </svg>
            </button>
          </div>
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
                      className="button-types"
                      onClick={(e) => {
                        handleActiveFilter(e, type.name);
                        handleTypes();
                      }}
                    >
                      {type.name}
                    </button>
                  </li>
                )
              );
            })}
          </ul>
        </div>
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
