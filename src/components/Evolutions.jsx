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
                <Evolution
                  key={`evolution-${name}`}
                  name={name}
                  length={evolutionsName.length}
                  index={index}
                />
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
