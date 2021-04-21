import { useEffect, useState } from 'react';
import axios from 'axios';

export default function FiltersAbtilities() {
  const [abilities, setAbilities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('https://pokeapi.co/api/v2/ability?offset=0&limit=267')
      .then(({ data }) => {
        setAbilities(data.results);
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
      {isLoading && <div className="pokespinner" />}
      {error && <div className="error" />}
      {!isLoading && !error && (
        <select name="Abilities" id="abilitySelect">
          {abilities.map((ability) => (
            <option value={ability.name}>{ability.name}</option>
          ))}
        </select>
      )}
    </>
  );
}
