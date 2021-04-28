import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import PokemonPage from './components/PokemonPage';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/:pokemonName" component={PokemonPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
