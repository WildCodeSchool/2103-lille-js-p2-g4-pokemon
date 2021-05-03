import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import PokeSpinner from './PokeSpinner';
import Error from './Error';
import './css/Weaknesses.scss';

export default function Weaknesses({ url }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [type, setType] = useState({
    damage_relations: {
      double_damage_from: [
        {
          name: '',
        },
      ],
    },
  });

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(url)
      .then(({ data }) => {
        setType(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading && <PokeSpinner />}
      {!isLoading && error && (
        <Error kaomoji="( ᵒ̴̶̷̥́ _ᵒ̴̶̷̣̥̀ )" msg="Weaknesses not found" />
      )}
      {!isLoading && !error && (
        <ul className="weaknesses-list">
          {type.damage_relations.double_damage_from.map((weakness) => {
            return (
              <li key={weakness.name} className={`weakness ${weakness.name}`}>
                {weakness.name}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

Weaknesses.propTypes = {
  url: PropTypes.string,
};

Weaknesses.defaultProps = {
  url: '',
};
