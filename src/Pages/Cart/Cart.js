import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import CartItem from '../../components/CartItem/CartItem';
import { addCount, subCount } from '../../actions/cartActions'

import {
  Container,
  Wrapper,
  Title,
  EmptyCart,
  TaxInfo,
  Items,
  Button
} from './CartElements'


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
    const { selectedCurrency } = this.state;
    let tax = 0.21 * cartTotal
    
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
            <Items style={{ marginTop: '20px' }}>Tax: {cart[0] && cart[0].prices[selectedCurrency].currency.symbol } {tax.toFixed(2)}</Items>
            <Items>Quantity: {quantity}</Items>
            {cart[0] && <Items>
              Total: { cart[0].prices[selectedCurrency].currency.symbol } {parseFloat(cartTotal).toFixed(2)} 
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
