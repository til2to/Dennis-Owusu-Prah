import React, { Component, Fragment } from 'react'
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
  constructor(props) {
    super(props);
    this.state = {
      selectedCurrency: JSON.parse(window.localStorage.getItem("SelectedCurrency")),
    };
  }
  static propTypes = {}

  render() {
    const { cartItems: {cart, quantity, total}, overlayToggle, hideOverlay } = this.props;
    let cartTotal = window.localStorage.getItem('total')
    const { selectedCurrency } = this.state

    return (
      <Container>
        <Wrapper>
          <Title>
            <span>My Bag {quantity} items</span>
          </Title>
          {
            cart?.map((item, index) => (
              <CartItem key={index} item={item} noArrows={true} />
            ))
          }
          <Total>
            <Text>Total</Text>
            {
              cart[0] &&
              <Amount>
                { cart[0]?.prices[selectedCurrency]?.currency.symbol } {parseFloat(cartTotal).toFixed(2)}
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

export default connect((state) => ({ cartItems: state.cart }),
  null)(MyBag)
