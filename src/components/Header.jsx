import './css/Header.scss';

const Header = () => {
  return (
    <header className="Header">
      <img src="/img/logoPokemonDesk.png" alt="logo" className="logoDesktop" />
      <div className="searchContainer">
        <input
          type="search"
          name="siteSearch"
          id="searchBar"
          placeholder=" Search your Pokemon by ID or by Name..."
        />
      </div>
      <div className="divEmpty" />
    </header>
  );
};

export default Header;
