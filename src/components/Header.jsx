import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  const [select, setSelect] = useState(1);
  const [widthScreen, setWidthScreen] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener('resize', () => setWidthScreen(window.innerWidth));
  });

  const [menuDisplay, setMenuDisplay] = useState(window.innerWidth > 800);
  useEffect(() => {
    document.querySelector('.menuContainer').style.display = menuDisplay
      ? 'flex'
      : 'none';
  }, [menuDisplay]);

  const handleMenu = (click) => {
    if (click === 'checkbox' || click === 'resize') {
      setMenuDisplay(!menuDisplay);
    } else if (click === 'link' && widthScreen <= 800) {
      setMenuDisplay(false);
    }
    return null;
  };

  useEffect(() => {
    if (widthScreen > 800 && menuDisplay === false) {
      handleMenu('resize');
    } else if (widthScreen <= 800 && menuDisplay === true) {
      handleMenu('resize');
    }
  }, [widthScreen]);

  return (
    <header>
      <nav>
        <Link
          onClick={() => {
            setSelect(1);
            handleMenu('link');
          }}
          className="navLogo"
          to="/"
        >
          <img
            src={`/img/${widthScreen > 800 ? 'logoDesktop' : 'logoPhone'}.svg`}
            alt="logo"
          />
        </Link>
        <label htmlFor="checkBurger" className="burger">
          <input
            type="checkbox"
            id="checkBurger"
            checked={menuDisplay}
            onChange={() => handleMenu('checkbox')}
          />
          <span className="line1" />
          <span className="line2" />
          <span className="line3" />
        </label>
        <div className="menuContainer">
          <ul className="navLinks">
            <li>
              <Link
                onClick={() => {
                  setSelect(1);
                  handleMenu('link');
                }}
                className={`navLink ${select === 1 && 'selected'}`}
                to="/"
              >
                All
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  setSelect(2);
                  handleMenu('link');
                }}
                className={`navLink ${select === 2 && 'selected'}`}
                to="/specs"
              >
                Specs
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  setSelect(3);
                  handleMenu('link');
                }}
                className={`navLink ${select === 3 && 'selected'}`}
                to="/about-us"
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                onClick={() => {
                  setSelect(4);
                  handleMenu('link');
                }}
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
        </div>
      </nav>
    </header>
  );
};

export default Header;
