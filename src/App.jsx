import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import PokemonPage from './components/PokemonPage';
import Header from './components/Header';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <main>
            <Route exact path="/" component={Homepage} />
            <Route path="/:pokemonName" component={PokemonPage} />
          </main>
          <Header />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
