import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import PokemonPage from './components/PokemonPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/pokemon-infos/:pokemonName" component={PokemonPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
