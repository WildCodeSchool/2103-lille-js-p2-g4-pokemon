import './css/Homepage.scss';
// import Filters from './Filters';
import PokemonList from './PokemonList';

const Homepage = () => {
  return (
    <div className="Homepage">
      {/* <Filters /> */}
      <PokemonList />
    </div>
  );
};
export default Homepage;
