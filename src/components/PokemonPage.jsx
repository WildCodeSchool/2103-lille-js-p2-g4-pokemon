import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import PokeSpinner from './PokeSpinner';
import Error from './Error';
import Weaknesses from './Weaknesses';
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
        <div className="pokedex">
          <div className="pokeWeak">
            <div className="basicsInfos">
              <img
                src={infos.sprites.other['official-artwork'].front_default}
                alt=""
              />
              <div className="nameNumber">
                <h1>#{infos.id}</h1>
                <h2>
                  {infos.name.charAt(0).toUpperCase() + infos.name.slice(1)}
                </h2>
                <h3>
                  {infos.types.map((element) => element.type.name).join(' - ')}
                </h3>
              </div>
            </div>
            {infos.types[0].type.url && (
              <div className="weaknesses">
                <h4>Weaknesses</h4>
                <Weaknesses url={infos.types[0].type.url} />
              </div>
            )}
          </div>
          <div className="pokeStats">
            <ul>
              <li>WEIGHT: {infos.weight} lbs</li>
              <li>HEIGHT: {infos.height} cm</li>
              <li>e: </li>
              <li>XP: {infos.base_experience} pts</li>
              <li>
                ABILITIES:
                <p>
                  {infos.abilities
                    .map((element) => element.ability.name)
                    .join(' - ')}
                </p>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonPage;
