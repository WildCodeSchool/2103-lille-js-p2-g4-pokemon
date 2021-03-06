import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './css/colorTypes.scss';

export default function FiltersTypes({ setTypesFilters }) {
  const [types, setTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('https://pokeapi.co/api/v2/type')
      .then(({ data }) => {
        setTypes(
          data.results.filter(
            (type) => type.name !== 'unknown' && type.name !== 'shadow'
          )
        );
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
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

  return (
    <>
      {!isLoading && error && <p>error</p>}
      {!isLoading && !error && (
        <div className="types-container">
          <h1>Types</h1>
          <ul className="filters-types">
            {types.map((type) => {
              return (
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
