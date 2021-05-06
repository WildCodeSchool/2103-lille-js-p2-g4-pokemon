import { useState } from 'react';
import PropTypes from 'prop-types';
import FiltersTypes from './FiltersTypes';
import FiltersAbilities from './FiltersAbilities';
import './css/Filters.scss';

export default function Filters({
  setTypesFilters,
  setAbilityFilters,
  setHeightFilters,
  setWeightFilters,
}) {
  const [openWrapper, setOpenWrapper] = useState(false);

  const resetFilters = () => {
    const activeTypes = document.querySelectorAll('.button-types');
    const activeAbility = document.querySelector('#abilitySelect');
    const activeHeight = document.querySelector('#heightSelect');
    const activeWeight = document.querySelector('#weightSelect');

    activeTypes.forEach((button) => {
      button.classList.remove(...button.classList);
      button.classList.add('button-types');
    });
    activeAbility.value = 'all';
    activeHeight.value = 'all';
    activeWeight.value = 'all';

    setTypesFilters([]);
    setAbilityFilters('all');
    setHeightFilters('all');
    setWeightFilters('all');
  };

  return (
    <div className={`Filters ${openWrapper ? 'open' : ''}`}>
      <div className={`filter-wrapper ${openWrapper ? 'open' : ''}`}>
        <div className="buttons-container">
          <button
            type="button"
            className="button-filters-refresh"
            onClick={resetFilters}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M14 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2zm-2-9c-4.97 0-9 4.03-9 9H0l4 4 4-4H5c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.51 0-2.91-.49-4.06-1.3l-1.42 1.44C8.04 20.3 9.94 21 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z" />
            </svg>
          </button>
          <button
            type="button"
            className="button-filters-hide"
            onClick={() => {
              setOpenWrapper(!openWrapper);
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
            </svg>
          </button>
        </div>
        <FiltersTypes setTypesFilters={setTypesFilters} />
        <div className="filters-others-container">
          <FiltersAbilities setAbilityFilters={setAbilityFilters} />
          <div className="select-height">
            <h2>Height</h2>
            <select
              name="height"
              id="heightSelect"
              onChange={(e) => {
                setHeightFilters(e.target.value);
              }}
            >
              <option>all</option>
              <option>small</option>
              <option>medium</option>
              <option>big</option>
            </select>
          </div>
          <div className="select-weight">
            <h2>weight</h2>
            <select
              name="weight"
              id="weightSelect"
              onChange={(e) => {
                setWeightFilters(e.target.value);
              }}
            >
              <option>all</option>
              <option>light</option>
              <option>medium</option>
              <option>heavy</option>
            </select>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="button-wrapper"
        onClick={() => {
          setOpenWrapper(!openWrapper);
        }}
      >
        {openWrapper ? 'Hide Filters ▲' : 'Show Filters ▼'}
      </button>
    </div>
  );
}

Filters.propTypes = {
  setTypesFilters: PropTypes.func,
  setAbilityFilters: PropTypes.func,
  setHeightFilters: PropTypes.func,
  setWeightFilters: PropTypes.func,
};

Filters.defaultProps = {
  setTypesFilters: () => {},
  setAbilityFilters: () => {},
  setHeightFilters: () => {},
  setWeightFilters: () => {},
};
