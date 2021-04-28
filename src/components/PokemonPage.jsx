import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './css/PokemonPage.scss';
import Evolutions from './Evolutions';

const PokemonPage = () => {
  const [species, setSpecies] = useState({
    evolution_chain: '',
  });
  const { pokemonName } = useParams();
  const [infos, setinfos] = useState({
    abilities: [
      {
        ability: {
          name: 'undefined',
        },
      },
    ],
    sprites: {
      other: {
        'official-artwork': {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png',
        },
      },
    },
    id: 0,
    name: 'undefined',
    types: [
      {
        type: {
          name: 'undefined',
        },
      },
    ],
  });

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then(({ data }) => {
        setinfos(data);
        axios
          .get(`https://pokeapi.co/api/v2/pokemon-species/${data.id}/`)
          .then(({ data: dataSpecies }) => {
            setSpecies(dataSpecies);
          });
      });
  }, [pokemonName, infos]);

  return (
    <div className="pokemonPage">
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
              <h3>{infos.types[0].type.name}</h3>
            </div>
          </div>
          <div className="weaknesses">
            <h4>Weaknesses</h4>
          </div>
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
      <Evolutions chain={species.evolution_chain.url} />
    </div>
  );
};

export default PokemonPage;
