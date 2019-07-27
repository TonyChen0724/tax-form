import React from 'react';
import logo from './logo.svg';
import './App.css';
import { descriptionFromModule } from './components/MyFunctionalDescription';
import { TaxDetails } from './components/taxDetails/TaxDetails'

function App({ description }) {
  console.log(descriptionFromModule);
  return (
    <div className="App">
      <header className="App-header" tabIndex={0}>
        <img src={logo} className="App-logo" alt="logo" />
        <TaxDetails />
      </header>
    </div>
  );
}

export default App;
