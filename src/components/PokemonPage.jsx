import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import Weaknesses from './Weaknesses';
import Evolutions from './Evolutions';
import PokeSpinner from './PokeSpinner';
import Error from './Error';
import './css/PokemonPage.scss';
import './css/searchbar.scss';

const PokemonPage = () => {
  const { pokemon } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [infos, setinfos] = useState({
    abilities: [
      {
        ability: {
          name: '',
        },
      },
    ],
    species: {
      url: '',
    },
    sprites: {
      other: {
        'official-artwork': {
          front_default: '',
        },
      },
    },
    id: 0,
    name: '',
    types: [
      {
        type: {
          name: '',
          url: '',
        },
      },
    ],
  });

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then(({ data }) => {
        setinfos(data);
        document.querySelector('.searchbar').value = '';
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [pokemon]);

  const isNumeric = (str) => {
    for (let i = 0; i < str.length; i += 1) {
      if (str[i] !== '0' && !parseInt(str[i], 10)) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.querySelector('.searchbar').value;

    if (query) {
      if (isNumeric(query)) {
        history.push(`/id/${query}`);
      } else {
        history.push(`/name/${query}`);
      }
    }
  };

  return (
    <div className="pokemonPage">
      <span className="header-bottom" />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="searchbar"
          placeholder=" Search your Pokemon by name or ID..."
        />
      </form>
      {isLoading && <PokeSpinner />}
      {!isLoading && error && (
        <Error kaomoji="( ᵒ̴̶̷̥́ _ᵒ̴̶̷̣̥̀ )" msg="Pokemon not found" />
      )}
      {!isLoading && !error && (
        <>
          <div className="nameNumber">
            <div className="pokeImg">
              <img
                src={infos.sprites.other['official-artwork'].front_default}
                alt=""
              />
            </div>
            <div className={`pokeName ${infos.types[0].type.name}`}>
              <h1>#{infos.id}</h1>
              <h2>
                {infos.name.charAt(0).toUpperCase() + infos.name.slice(1)}
              </h2>
              <h3>
                {infos.types.map((element) => element.type.name).join(' - ')}
              </h3>
            </div>
          </div>
          <div className="pokeStats">
            <h4>Statistics</h4>
            <ul>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="weightSVG"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29l-1.43-1.43z" />
                </svg>
                <p>{infos.weight / 10} kg</p>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <polygon points="13,6.99 16,6.99 12,3 8,6.99 11,6.99 11,17.01 8,17.01 12,21 16,17.01 13,17.01" />
                </svg>
                <p>{infos.height / 10} m</p>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z" />
                </svg>
                <p>{infos.base_experience} pts</p>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
                </svg>
                <p>
                  {infos.abilities
                    .map((element) => element.ability.name)
                    .join(' - ')}
                </p>
              </li>
            </ul>
          </div>
          <div className="weaknesses">
            <h4>Weaknesses</h4>
            {infos.types[0].type.url && (
              <Weaknesses url={infos.types[0].type.url} />
            )}
          </div>
          <div className="poke-evolutions">
            <h4>Evolutions</h4>
            {infos.species.url && <Evolutions url={infos.species.url} />}
          </div>
        </>
      )}
    </div>
  );
};

export default PokemonPage;
