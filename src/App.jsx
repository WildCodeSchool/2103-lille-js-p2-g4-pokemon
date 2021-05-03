import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import PokemonPage from './components/PokemonPage';
import Header from './components/Header';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <main>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route path="/name/:pokemon" component={PokemonPage} />
            <Route path="/id/:pokemon" component={PokemonPage} />
          </Switch>
        </main>
        <Header />
      </div>
    </BrowserRouter>
  );
}

export default App;
