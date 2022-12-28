import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CartItem from '../CartItem/CartItem';
import {
  Container,
  Wrapper,
  Title,
  Total,
  Text,
  Amount,
  ButtonsContainer,
  StyledLink,
  Button,
  ButtonCheckout
} from './MyBagElements';


class MyBag extends Component {
  static propTypes = {}

  render() {
    const { cartItems: {cart, quantity }, hideOverlay } = this.props;
    
    let cartTotal = window.localStorage.getItem('total')
    let price_index = JSON.parse(window.localStorage.getItem('SelectedCurrency'))
    
    return (
      <Container quantity={quantity}>
        <Wrapper>
          <Title>
            {quantity === 0 && (<h>Please add product(s)</h>)}
            {quantity > 0 && <span>My Bag {quantity} Items</span>}
          </Title>
          {
            cart?.map((item, index) => (
              <CartItem key={index} item={item} noArrows={true} />
            ))
          }
          <Total>
            <Text>Total</Text>
            {
              cart[0] ?
              <Amount>
                { cart[0].prices[price_index].currency.symbol } 
                {parseFloat(cartTotal).toFixed(2)}
              </Amount>
              : 
              <Amount>
                {parseFloat(cartTotal).toFixed(2)}
              </Amount>
            }
          </Total>

          <ButtonsContainer>
            <StyledLink to='/cart'>
              <Button onClick={hideOverlay}> VIEW BAG </Button>
            </StyledLink>
            <StyledLink to='#'>
              <ButtonCheckout onClick={hideOverlay}> CHECKOUT </ButtonCheckout>
            </StyledLink>
          </ButtonsContainer>
        </Wrapper>
      </Container>
    )
  }
}

export default connect((state) => ({ cartItems: state.cart, currentCurrency: state.currency }),
  null)(MyBag)
