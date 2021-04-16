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
            placeholder="Search by name or number of the pokemon"
          />
        </form>
      </div>
      <div />
    </header>
  );
};

export default Header;
