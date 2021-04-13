import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import All from './components/All';
import Specs from './components/Specs';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import './App.scss';

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Switch>
            <Route exact path="/" component={All} />
            <Route path="/specs" component={Specs} />
            <Route path="/about-us" component={AboutUs} />
            <Route path="/contact" component={Contact} />
          </Switch>
        </main>
        <Header />
      </div>
    </Router>
  );
}

export default App;
