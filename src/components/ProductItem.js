import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import basket from '../images/basket.png'
import { connect } from 'react-redux';
import { addToCart } from '../actions/cartActions'


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
                  attributes.length == 0 ?
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

const ProductSelector = styled.div`
  position: absolute;
  right: 15%;
  bottom: 0;
  width: 52px;
  height: 52px;
  opacity: 0;
`
const Container = styled.div`
  flex: 1;
  max-width: 370px;
  margin-bottom: 15px;
  position: relative;

  &:hover ${ProductSelector}{
      opacity: 1
  }
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 310px;
  height: 330px;
`
const ProductImage = styled.div`
  margin-bottom: 10px;
  width: 310px;
  height: 300px;
  position: relative;

  &:hover{
      opacity: 0.8;
  }
`
const Gallery = styled.img`
  object-fit: none;
  width: 300px;
  height: 280px;
  position: relative;
`
const ImageG = styled.div`
  position: relative;
`
const Stock = styled.div`
  position: absolute;
  color: red;
  top: 40%;
  right: 40%;
`
const ProductInfo = styled.div`
`
const PriceItems = styled.div`
  display: flex;
  margin-top: 5px;
`
const CurrencySymbol = styled.div`
  margin-right: 5px;
`
const Amount = styled.div`
`
const Brand = styled.span`
  font-size: 16px;
  font-weight: 100;
  margin-right: 5px;
`
const Name = styled.span`
  font-weight: 100;
`
const SelectIcon = styled.img`
  padding: 15px;
  width: 25px;
  height: 22px;
  background-color: #5ECE7B;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transition: all 0.5s ease
`