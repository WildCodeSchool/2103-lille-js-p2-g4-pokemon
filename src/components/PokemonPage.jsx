import './css/PokemonPage.scss';

const PokemonPage = () => {
  return (
    <div className="pokemonPage">
      <div className="pokedex">
        <div className="pokeWeak">
          <div className="basicsInfos">
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
              alt=""
            />
            <div className="nameNumber">
              <h1>#ID</h1>
              <h2>NAME</h2>
              <h3>TYPES</h3>
            </div>
          </div>
          <div className="weaknesses">
            <h4>Weaknesses</h4>
          </div>
        </div>
        <div className="pokeStats">
          <ul>
            <li>HEIGHT</li>
            <li>WEIGHT WATCHERS</li>
            <li>GENDER</li>
            <li>CATEGORY</li>
            <li>ABILITIES</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PokemonPage;
