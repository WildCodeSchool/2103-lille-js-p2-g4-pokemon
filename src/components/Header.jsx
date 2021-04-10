import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  return (
    <header>
      <nav>
        <img src="/img/logoDesktop.svg" alt="logo" />
        <ul className="navLinks">
          <li>
            <Link to="/">All</Link>
          </li>
          <li>
            <Link to="/specs">Specs</Link>
          </li>
          <li>
            <Link to="/about-us">About us</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <button type="button" className="rocketButton">
          <img src="/img/rocketButtonText.png" alt="rocket mode" />
        </button>
      </nav>
    </header>
  );
};

export default Header;
