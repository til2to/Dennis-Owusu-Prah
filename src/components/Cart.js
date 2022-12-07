import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from 'react-redux';
import CartItem from './CartItem';
import { addCount, subCount } from '../actions/cartActions'


class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCurrency: JSON.parse(window.localStorage.getItem("SelectedCurrency")),
    };
  }

  render() {
    let { cartItems: { cart, quantity, total } } = this.props;
    let cartTotal = JSON.parse(window.localStorage.getItem('total'))
    const { selectedCurrency } = this.state
    
    return (
      <Container>
        <Wrapper>
          <Title>
            <span>CART</span>
          </Title>
          {
            quantity === 0
              ?
              (<EmptyCart>Your cart is empty. Please add a product</EmptyCart>)
              :
              cart.map((item, index) => (
                <CartItem key={index} item={item} addCount={this.props.addCount} />
            ) )
          }
          <TaxInfo>
            <Items style={{ marginTop: '20px' }}>Tax:</Items>
            <Items>Quantity: {quantity}</Items>
            {cart[0] && <Items>
              total: { cart[0].prices[selectedCurrency].currency.symbol } {parseFloat(cartTotal).toFixed(2)} 
            </Items>}
          </TaxInfo>
          <Button> ORDER </Button>
        </Wrapper>
      </Container>
    )
  }
}

export default connect((state) => ({ cartItems: state.cart }),
  { addCount, subCount })(Cart)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-left: 22px;
  margin-right: 10px;
`
const Wrapper = styled.div`
  margin-left: 20px;
  margin-top: 30px;
`
const Title = styled.div`
  font-size: 25px;
  font-weight: 500;
  margin-bottom: 40px;
`
const Button = styled.div`
  font-weight: 600;
  color: white;
  background-color: #5ECE7B;
  height: 40px;
  width: 250px;
  display: flex;
  justify-content: center;
  border-radius: 3px; 
  opacity: 0.85;
  font-size: 13px;
  cursor: pointer;
  margin-top: 15px;
  margin-bottom: 10px;
  align-items: center;  
`
const TaxInfo = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 0.5px solid #E5E5E5;
  margin-right: 40px;
`
const Items = styled.div`
    margin-top: 10px;
    font-size: 20px;
    font-weight: 100;
`
const EmptyCart = styled.div`
  font-size: 20px;
  font-weight: 100;
  margin-bottom: 10px;
`