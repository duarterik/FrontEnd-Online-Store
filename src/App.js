import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Carrinho from './components/Carrinho';
import TelaPrincipal from './components/TelaPrincipal';
import Detalhes from './components/Detalhes';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItems: [],
    };
  }

  addToCart = (event, element) => {
    this.setState((prevState) => ({
      cartItems: [...prevState.cartItems, element],
    }));
  }

  render() {
    const { cartItems } = this.state;
    return (
      <BrowserRouter>
        <Route
          exact
          path="/"
          render={ (props) => (
            <TelaPrincipal { ...props } addToCart={ this.addToCart } />
          ) }
        />
        <Route
          exact
          path="/carrinho"
          render={ (props) => (
            <Carrinho { ...props } cartItems={ cartItems } />
          ) }
        />
        <Route
          path="/detalhes/*"
          render={ (props) => (
            <Detalhes { ...props } addToCart={ this.addToCart } />
          ) }
        />
      </BrowserRouter>
    );
  }
}

export default App;
