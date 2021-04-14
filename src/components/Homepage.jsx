import './css/Homepage.scss';
import PokemonList from './PokemonList';

const Homepage = () => {
  return (
    <div className="Homepage">
      {/* Calling the <Pokemon /> component */}
      <PokemonList />
    </div>
  );
};
export default Homepage;
