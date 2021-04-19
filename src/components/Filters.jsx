import axios from 'axios';
import { useState, useEffect } from 'react';
import './css/Filters.scss';
import colorTypes from '../colorTypes.json';

export default function Filters() {
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
    <div className="filters">
      <ul className="filters-types">
        {types.map((type) => {
          return (
            type.name !== 'unknown' && (
              <li key={type.name}>
                <button
                  type="button"
                  data-type="type"
                  data-value={type.name}
                  className="filters-type filter-active"
                  onClick={handleActiveFilter}
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
  );
}
