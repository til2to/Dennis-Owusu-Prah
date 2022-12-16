import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import logo from "../images/logo.png";
import basket_ from "../images/basket_.png";
import logoH from "../images/logoH.png";
import Categories from "./Categories";
import { connect } from "react-redux";
import Overlay from "./Overlay";
import CurrencySelector from "./CurrencySelector";

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

const Container = styled.div`
  height: 60px;
  z-index: 1;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 1;
  width: 95%;
`;
const NavLeft = styled.div`
  flex: 1;
  display: flex;
  margin: 10px;
  align-items: center;
`;
const NavCenter = styled.div`
  flex: 1;
  margin-left: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LogoHolder = styled.img`
  position: relative;
  height: 28.62px;
  width: 31.18px;
  position: relative;
  background: linear-gradient(316.98deg, #52d67a 16.86%, #5aee87 84.04%);
`;
const NavLogo = styled.img`
  position: absolute;
  width: 14.08px;
  height: 8.99px;
  position: absolute;
`;
const Select = styled.select`
  padding-right: 3px;
  border: none;
  font-size: 17px;
  font-weight: 500;
  font-style: 17px;
  color: #1d1f22;
  text-align: right;
`;
const NavRight = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const Currency = styled.img`
  margin-right: 10px;
`;
const CurrencyItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 30px;
  margin-left: 10px;
`;
const DownArrow = styled.img`
  height: 3px;
  width: 6px;
  margin-top: 4px;
`;
const Bag = styled.div`
  margin-right: 30px;
  margin-left: 20px;
  position: relative;
  cursor: pointer;
  margin-top: 7px;
`;
const TotalItems = styled.div`
  position: absolute;
  padding: 2px 5px;
  background: rgba(0, 0, 0, 0.73);
  border-radius: 50%;
  color: white;
  font-size: 12px;
  bottom: 10px;
  left: 10px;
`;
const MyBag_Bag = styled.div``;

const Symbol_Label = styled.div`
`;

const ArrowContainer = styled.div``;