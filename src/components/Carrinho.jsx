import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Carrinho extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  componentDidMount() {
    const { cartItems } = this.props;
    this.myFunc(cartItems);
  }

  myFunc = (cartItems) => {
    const newArray = [...cartItems];
    const quantity = 1;
    newArray.map((element) => {
      element.quantidade = quantity;
    });
    console.log(newArray);
  }

  render() {
    const { cartItems } = this.props;
    return (
      <div>
        { cartItems.length < 1
          && (
            <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio.</p>
          )}

        {cartItems.map((cartItem) => (
          <div key={ cartItem.id }>
            <p data-testid="shopping-cart-product-name">{cartItem.title}</p>
            <img src={ cartItem.thumbnail } alt={ cartItem.title } />
            <p data-testid="shopping-cart-product-quantity">1</p>
            <button data-testid="product-increase-quantity" type="button">+</button>
            <button data-testid="product-decrease-quantity" type="button">-</button>
          </div>
        ))}
      </div>
    );
  }
}

Carrinho.propTypes = {
  cartItems: PropTypes.array,
}.isRequired;
