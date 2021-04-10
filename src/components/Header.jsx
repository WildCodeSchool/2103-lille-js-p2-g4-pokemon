import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <div className="navLinks">
          <ul>
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
        </div>
      </nav>
    </header>
  );
};

export default Header;
