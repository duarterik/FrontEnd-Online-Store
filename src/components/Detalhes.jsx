import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

export default class Detalhes extends Component {
  constructor() {
    super();
    this.state = {
      detailProduct: [],
    };
  }

  componentDidMount() {
    this.fetchItem();
  }

  fetchItem = async () => {
    const { match: { url } } = this.props;
    const splitUrl = url.split('/');
    const id = splitUrl[2];
    const recoveredProduct = await getProductById(id);
    this.setState(({
      detailProduct: recoveredProduct,
    }));
  }

  render() {
    const { detailProduct } = this.state;
    const { addToCart } = this.props;
    return (
      <div>
        <Link to="/carrinho">
          <button type="button" data-testid="shopping-cart-button">Carrinho</button>
        </Link>
        <div>
          <p data-testid="product-detail-name">{detailProduct.title}</p>
          <p>{detailProduct.price}</p>
          <p>{detailProduct.warranty}</p>
          <img src={ detailProduct.thumbnail } alt={ detailProduct.title } />
          <button
            data-testid="product-detail-add-to-cart"
            type="button"
            onClick={ (event) => addToCart(event, detailProduct) }
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  }
}
Detalhes.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
