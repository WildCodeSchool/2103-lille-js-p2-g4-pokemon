import PropTypes from 'prop-types';
import FiltersTypes from './FiltersTypes';
import './css/Filters.scss';

export default function Filters({ setTypesFilters }) {
  return (
    <div className="Filters">
      <div className="filter-wrapper">
        <FiltersTypes setTypesFilters={setTypesFilters} />
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
