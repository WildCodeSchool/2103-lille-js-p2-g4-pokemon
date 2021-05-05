import { Link } from 'react-router-dom';
import './css/Header.scss';

const Header = () => {
  return (
    <header className="Header">
      <Link to="/">
        <img src="/img/logo.png" alt="logo" className="logoDesktop" />
      </Link>
      <div className="divEmpty" />
    </header>
  );
};

export default Header;
