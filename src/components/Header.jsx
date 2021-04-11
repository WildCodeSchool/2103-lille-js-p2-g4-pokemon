import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  const [select, setSelect] = useState(1);
  const [widthScreen, setWidthScreen] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', () => setWidthScreen(window.innerWidth));
  }, [widthScreen]);
  return (
    <header>
      <nav>
        <img
          className="navLogo"
          src={`/img/${widthScreen > 800 ? 'logoDesktop' : 'logoPhone'}.svg`}
          alt="logo"
        />
        <ul className="navLinks">
          <li>
            <Link
              onClick={() => setSelect(1)}
              className={`navLink ${select === 1 && 'selected'}`}
              to="/"
            >
              All
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setSelect(2)}
              className={`navLink ${select === 2 && 'selected'}`}
              to="/specs"
            >
              Specs
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setSelect(3)}
              className={`navLink ${select === 3 && 'selected'}`}
              to="/about-us"
            >
              About us
            </Link>
          </li>
          <li>
            <Link
              onClick={() => setSelect(4)}
              className={`navLink ${select === 4 && 'selected'}`}
              to="/contact"
            >
              Contact
            </Link>
          </li>
        </ul>
        <button className="rocketButton" type="button">
          <img src="/img/rocketButtonText.png" alt="rocket mode" />
        </button>
      </nav>
    </header>
  );
};

export default Header;
