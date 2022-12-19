import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import basket from '../../images/basket.png'
import { connect } from 'react-redux';
import { addToCart } from '../../actions/cartActions'

import {
  Container,
  Wrapper,
  ProductImage,
  ProductInfo,
  ProductSelector,
  ImageG,
  Gallery,
  Stock,
  SelectIcon,
  Brand,
  Name,
  PriceItems,
  CurrencySymbol
} from './ProductItemElements'


class ProductItem extends Component {
  static propTypes = {}
  constructor(props) {
    super(props);
    this.state = {
      selectedCurrency: JSON.parse(window.localStorage.getItem("SelectedCurrency")),
    };
  }

  render() {
    const { selectedCurrency } = this.state
    const { name, brand, gallery, id, prices, inStock, attributes} = this.props.prod;
    let currentProduct = this.props.prod
    
    return (
      <Container style={!inStock ? { pointerEvents: 'none', opacity: 0.55 } : {}}>
          <Wrapper>
            <ProductImage>
              <ImageG>
                <Gallery src={gallery[0]} />
                {!inStock &&
                  <Stock>OUT OF STOCK</Stock>}
              </ImageG>
              <Link to={`/product/${id}`}> 
                { 
                  attributes.length === 0 ?
                  (<ProductSelector onClick={() => this.props.addToCart({...currentProduct, count: 1})}>
                    <SelectIcon src={basket} />
                  </ProductSelector>)
                  :
                  (<ProductSelector>
                    <SelectIcon src={basket} />
                  </ProductSelector>)
                }
              </Link>
            </ProductImage>
            <ProductInfo>
              <Brand>{brand}</Brand>
              <Name>{name}</Name>
              
              <PriceItems>
                <CurrencySymbol>
                  {prices[selectedCurrency].currency.symbol} {prices[selectedCurrency].amount}
                </CurrencySymbol>
              </PriceItems>
            </ProductInfo>
        </Wrapper>
      </Container>
    )
  }
}

export default connect(null, { addToCart })(ProductItem)
