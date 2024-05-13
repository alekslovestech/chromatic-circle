import logo from "./logo.svg";
import "./App.css";
import ChromaticCircle from "./Chromatic-circle";

function App() {
  return (
    <div className="Chromatic">
      <header className="App-header">
        <h1>Chromatic Circle</h1>
        <ChromaticCircle />

        {/*<img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {/*<a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
  </a>*/}
      </header>
    </div>
  );
}

export default App;
