import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import CartItem from './CartItem';

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
            cart.map((item, index) => (
              <CartItem key={index} item={item} noArrows={true} />
            ))
          }
          <Total>
            <Text>Total</Text>
            {
              cart[0] &&
              <Amount>
                { cart[0].prices[selectedCurrency].currency.symbol } {parseFloat(cartTotal).toFixed(2)}
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

const Container = styled.div`
  padding: 7px;
  height: 100%;
  overflow-y: scroll;
  max-width: 410px;
  background-color: white;
  max-height: 550px;
  overflow-x: hidden;
`
const Wrapper = styled.div`
  margin: 0 10px;
`
const StyledLink = styled(Link)`
  text-decoration: none;
`
const Title = styled.div`
  margin-top: 15px;
  font-family: 'Raleway', sans-serif;
`
const Total = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
`
const Text = styled.div`
`
const Amount = styled.div`
  margin-right: 30px;
`
const ButtonsContainer = styled.div`
  display: flex;
  margin: 20px 10px 10px 0px;
`
const Button = styled.div`
  font-weight: 600;
  color: black;
  background-color: white;
  height: 40px;
  width: 160px;
  justify-content: center;
  display: flex;
  border-radius: 3px; 
  border: 1px solid black;
  opacity: 0.85;
  font-size: 13px;
  cursor: pointer;
  margin: 0 50px 10px 0;
  align-items: center; 
  position: relative;
  left: 10%; 
`
const ButtonCheckout = styled.div`
  font-weight: 600;
  color: white;
  background-color: #5ECE7B;
  display: flex;
  height: 40px;
  width: 160px;
  justify-content: center;
  border-radius: 3px; 
  opacity: 0.85;
  font-size: 13px;
  cursor: pointer;
  margin: 0 0px 10px 50px;
  align-items: center; 
  text-decoration: none; 
  position: relative;
  right: 20%; 
`
