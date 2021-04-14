import './css/Pokemon.scss';

const Pokemon = () => {
  return (
    <article className="pokemon">
      <img
        className="pokemon-image"
        src="/img/bulbasaur.png"
        alt="pokemon avatar"
      />
      <h2 className="pokemon-name">Bulbasaur</h2>
      <div className="pokemon-id-type">
        <p className="pokemon-id">#011 - </p>
        <p className="pokemon-type">type</p>
      </div>
      <div className="arrow-container">
        <img className="arrow" src="/img/arrow.svg" alt="right arrow" />
      </div>
    </article>
  );
};

export default Pokemon;
