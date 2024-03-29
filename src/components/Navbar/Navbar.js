import React, { Component } from "react";
import logo from "../../images/logo.png";
import basket_ from "../../images/basket_.png";
import logoH from "../../images/logoH.png";
import Categories from "../Categories/Categories";
import { connect } from "react-redux";
import Overlay from "../Overlay/Overlay";
import CurrencySelector from "../CurrencySelector/CurrencySelector";
import PropTypes from "prop-types";

import {
  Wrapper,
  NavLeft,
  NavCenter,
  NavRight,
  LogoHolder,
  NavLogo,
  CurrencyItems,
  MyBag,
  Bag,
  TotalItems
} from './NavbarElements'

class Navbar extends Component {
  constructor(props) {
    super(props);
    /* State to hold the current state of the modal or overlay */ 
    this.state = {
      toggleOverlay: false,
    };
  }

  /* function to toggle the overlay or modal  */ 
  showOverlay = () => {
    this.setState({
      toggleOverlay: !this.state.toggleOverlay,
    });
  };

  /*function to close the overlay when other areas are clicked */ 
  hideOverlay = () => {
    this.setState({
      toggleOverlay: false,
    });
  };

  render() {
    // Get the quantity of items/products in cart state.
    const { cartItems: { quantity } } = this.props;
    const { toggleOverlay } = this.state;

    return (
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
            <CurrencySelector />
            {/* Add click event to toggle the modal/overlay */}
            <MyBag onClick={()=>this.showOverlay()} >
              <Bag>
                {quantity > 0 && (<TotalItems>{quantity}</TotalItems>)}
                <img src={basket_} alt="" />
              </Bag>
            </MyBag>
            {/* Add click event to close the overlay when outside area is clicked */}
            {toggleOverlay && 
            <Overlay  hideOverlay={this.hideOverlay} />}
          </CurrencyItems>
        </NavRight>
      </Wrapper>
    );
  }
}

Navbar.propTypes = {
  cartItems: PropTypes.shape({
    quantity: PropTypes.number
  })
}

/* connect this component to the state for access to data */ 
export default connect((state) => ({ cartItems: state.cart }), null)(Navbar);