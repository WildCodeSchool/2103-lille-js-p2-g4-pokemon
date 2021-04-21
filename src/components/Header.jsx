import './css/Header.scss';

const Header = () => {
  return (
    <header className="Header">
      <img src="/img/logoDesktop.svg" alt="logo" className="logoDesktop" />
      <div className="searchContainer">
        <form className="formSearch" method="get">
          <input
            type="search"
            name="siteSearch"
            id="searchBar"
            placeholder=" Search your Pokemon by ID or by Name..."
          />
        </form>
      </div>
      <div className="divEmpty" />
    </header>
  );
};

export default Header;
