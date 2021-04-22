import PropTypes from 'prop-types';
import FiltersTypes from './FiltersTypes';
import FiltersAbilities from './FiltersAbilities';
import './css/Filters.scss';

export default function Filters({ setTypesFilters, setAbilityFilters }) {
  const resetFilters = () => {
    const activeTypes = document.querySelectorAll('.button-types');
    const activeAbility = document.querySelector('#abilitySelect');

    activeTypes.forEach((button) => {
      button.classList.remove(...button.classList);
      button.classList.add('button-types');
    });
    activeAbility.value = 'all';

    setTypesFilters([]);
    setAbilityFilters('all');
  };

  return (
    <div className="Filters">
      <div className="filter-wrapper">
        <button
          type="button"
          className="button-types-refresh"
          onClick={resetFilters}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
          </svg>
        </button>
        <FiltersTypes setTypesFilters={setTypesFilters} />
        <div className="filters-others-container">
          <FiltersAbilities setAbilityFilters={setAbilityFilters} />
          <div className="select-height">
            <h2>Height</h2>
            <select name="height" id="heightSelect">
              <option>all</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
          <div className="select-weight">
            <h2>weight</h2>
            <select name="weight" id="weightSelect">
              <option>all</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

Filters.propTypes = {
  setTypesFilters: PropTypes.func,
  setAbilityFilters: PropTypes.func,
};

Filters.defaultProps = {
  setTypesFilters: () => {},
  setAbilityFilters: () => {},
};
