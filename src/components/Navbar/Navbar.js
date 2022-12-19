import React, { Component } from "react";
import PropTypes from "prop-types";
import logo from "../../images/logo.png";
import basket_ from "../../images/basket_.png";
import logoH from "../../images/logoH.png";
import Categories from "../Categories/Categories";
import { connect } from "react-redux";
import Overlay from "../Overlay/Overlay";
import CurrencySelector from "../CurrencySelector/CurrencySelector";

import {
  Container,
  Wrapper,
  NavLeft,
  NavCenter,
  NavRight,
  LogoHolder,
  NavLogo,
  CurrencyItems,
  ArrowContainer,
  MyBag_Bag,
  Bag,
  TotalItems
} from './NavbarElements'

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleOverlay: false,
      currency: window.localStorage.getItem("Currency") || [],
    };
  }
  static propTypes = {};

  showOverlay = () => {
    this.setState({
      toggleOverlay: !this.state.toggleOverlay,
    });
  };

  hideOverlay = () => {
    this.setState({
      toggleOverlay: false,
    });
  };

  currencySwitcher = (index) => {
    window.localStorage.setItem("SelectCurrency", JSON.stringify(index))
  }

  render() {
    const { cartItems: { cart, quantity } } = this.props;
    const { toggleOverlay } = this.state;

    return (
      <Container>
        <Wrapper>
          <NavLeft>
            <Categories />
          </NavLeft>
          <NavCenter>
            <LogoHolder src={logoH} alt="" />
            <NavLogo src={logo} alt="" />
          </NavCenter>
          <NavRight>
            <CurrencyItems>
              <ArrowContainer>
                <CurrencySelector />
              </ArrowContainer>

              <MyBag_Bag onClick={()=>this.showOverlay()} >
                <Bag>
                  <TotalItems>{quantity}</TotalItems>
                  <img src={basket_} alt="" />
                </Bag>
              </MyBag_Bag>
              {toggleOverlay && 
              <Overlay  hideOverlay={this.hideOverlay} />}
            </CurrencyItems>
          </NavRight>
        </Wrapper>
      </Container>
    );
  }
}

export default connect((state) => ({ cartItems: state.cart }), null)(Navbar);
