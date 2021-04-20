import axios from 'axios';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import colorTypes from '../colorTypes.json';
import './css/Filters.scss';

export default function Filters({ setTypesFilters }) {
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
    const activeTypes = document.querySelectorAll(
      '.filters-type.filter-active'
    );
    const selectedTypes = [];

    activeTypes.forEach((type) => {
      selectedTypes.push(type.dataset.value);
    });
    setTypesFilters(selectedTypes);
  };

  if (loading) {
    return (
      <div className="filters">
        <div className="pokespinner" />
      </div>
    );
  }

  if (error) {
    return <div className="error" />;
  }

  return (
    <div className="Filters">
      <div className="filter-wrapper">
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
      </div>
    </div>
  );
}

Filters.propTypes = {
  setTypesFilters: PropTypes.func,
};

Filters.defaultProps = {
  setTypesFilters: () => {},
};
