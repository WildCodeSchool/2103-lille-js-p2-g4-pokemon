import { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

export default function Weakness({ url }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [type, setType] = useState({});

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(url)
      .then(({ data }) => {
        console.log(data);
        setType(data);
        console.log(type);
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
      {isLoading && <p>loading</p>}
      {error && <p>error</p>}
      {!isLoading && !error && (
        <li>
          <p>{url}</p>
        </li>
      )}
    </>
  );
}

Weakness.propTypes = {
  url: PropTypes.string,
};

Weakness.defaultProps = {
  url: '',
};
