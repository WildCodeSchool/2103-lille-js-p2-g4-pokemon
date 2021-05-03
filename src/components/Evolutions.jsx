import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Evolution from './Evolution';
import PokeSpinner from './PokeSpinner';
import Error from './Error';
import './css/Evolutions.scss';

export default function Evolutions({ url }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [evolutionsName, setEvolutionsName] = useState([]);

  const getEvolutionsNames = (chain, names = []) => {
    names.push(chain.species.name);
    if (chain.evolves_to.length !== 0) {
      getEvolutionsNames(chain.evolves_to[0], names);
    } else {
      setEvolutionsName(names);
    }
  };

  const getEvolutionChain = (species) => {
    axios
      .get(species.evolution_chain.url)
      .then(({ data }) => {
        getEvolutionsNames(data.chain);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(url)
      .then(({ data }) => {
        getEvolutionChain(data);
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
  }, []);

  return (
    evolutionsName && (
      <>
        {isLoading && <PokeSpinner />}
        {!isLoading && error && (
          <Error kaomoji="( ᵒ̴̶̷̥́ _ᵒ̴̶̷̣̥̀ )" msg="Evolutions not found" />
        )}
        {!isLoading && !error && (
          <ul className="Evolutions">
            {evolutionsName.map((name, index) => {
              return (
                <>
                  <Evolution key={name} name={name} />
                  {index < evolutionsName.length - 1 && (
                    <li className="evolution-arrow">
                      <svg
                        width="80px"
                        height="80px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.46 18a2.23 2.23 0 0 1-.91-.2 1.76 1.76 0 0 1-1.05-1.59V7.79A1.76 1.76 0 0 1 9.55 6.2a2.1 2.1 0 0 1 2.21.26l5.1 4.21a1.7 1.7 0 0 1 0 2.66l-5.1 4.21a2.06 2.06 0 0 1-1.3.46zm0-10v7.9l4.86-3.9z" />
                      </svg>
                    </li>
                  )}
                </>
              );
            })}
          </ul>
        )}
      </>
    )
  );
}

Evolutions.propTypes = {
  url: PropTypes.string,
};

Evolutions.defaultProps = {
  url: '',
};
