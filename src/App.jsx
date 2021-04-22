import Homepage from './components/Homepage';
import Header from './components/Header';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Homepage />
      </main>
    </div>
  );
}

export default App;
