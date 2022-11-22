import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  getCategories, getProductsFromQuery, getProductsFromCategory,
} from '../services/api';

export default class TelaPrincipal extends Component {
  constructor() {
    super();
    this.state = {
      dataCategories: [],
      searchInput: '',
      dataProducts: [],
    };
  }

  componentDidMount() {
    this.fetchCategories();
    this.fetchProductsByCategory();
  }

  fetchCategories = async () => {
    const myData = await getCategories();
    this.setState({ dataCategories: myData });
  }

  fetchProducts = async () => {
    const { searchInput } = this.state;
    const myProducts = await getProductsFromQuery(searchInput);
    this.setState({ dataProducts: myProducts.results });
  }

  fetchProductsByCategory = async (event, product) => {
    const myProducts = await getProductsFromCategory(product);
    this.setState({ dataProducts: myProducts.results });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { dataCategories, searchInput, dataProducts } = this.state;
    const { addToCart } = this.props;
    return (
      <div>
        <input
          onChange={ this.handleChange }
          name="searchInput"
          value={ searchInput }
          type="text"
          data-testid="query-input"
        />
        <button
          type="submit"
          data-testid="query-button"
          onClick={ this.fetchProducts }
        >
          Submit
        </button>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
        <Link to="/carrinho" data-testid="shopping-cart-button">
          <button type="button">Carrinho</button>
        </Link>
        <div>
          <ul>
            {dataCategories.map((element) => (
              <li key={ element.id } data-testid="category">
                <button
                  type="button"
                  onClick={ (event) => this.fetchProductsByCategory(event, element.id) }
                >
                  {element.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {dataProducts.length < 1 ? (<p>Nenhum produto foi encontrado</p>) : (
          <div>
            <ul>
              {dataProducts.map((element) => (
                <li key={ element.id } data-testid="product">
                  <h4>
                    <Link
                      data-testid="product-detail-link"
                      to={ `/detalhes/${element.id}` }
                    >
                      {`Nome: ${element.title}`}
                    </Link>
                  </h4>
                  <img src={ element.thumbnail } alt={ element.title } />
                  <p>{`Price: ${element.price}`}</p>
                  <button
                    data-testid="product-add-to-cart"
                    type="button"
                    onClick={ (event) => addToCart(event, element) }
                  >
                    Add to cart

                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

TelaPrincipal.propTypes = {
  addToCart: PropTypes.function,
}.isRequired;
