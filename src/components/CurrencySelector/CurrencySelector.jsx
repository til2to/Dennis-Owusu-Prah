import PropTypes from 'prop-types'
import React, { Component } from 'react'
import arrow from "../../images/arrow.svg";
import { connect } from "react-redux";
import { convertTotal } from "../../actions/cartActions";
import { changeCurrency } from "../../actions/currencyActions";

import {
  Wrap,
  CurrencySymbol,
  ArrowContainer,
  Arrow,
  Drop,
  Dropdown,
} from './CurrencySelectorElements'


class CurrencySelector extends Component {
  static propTypes = {}
  constructor(props) {
    super(props);
    this.state = {
      defaultCurrency: 0,
      open: false,
      // currencyChanger: 0,
      reload: false,
    }
  };

  container = React.createRef();

  componentDidMount() { 
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  currencyDropdown = () => {
    this.setState((state) => {
      return {
        open: !state.open,
      }
    })
  }

  handleClickOutside = (event) => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target)
      ) {
      this.setState({
        open: false,
      });
    }
  };

  setCurrency = (type) => {
    // window.localStorage.setItem('SelectedCurrency', JSON.stringify(type))
    // let currentCurrency = JSON.parse(window.localStorage.getItem('SelectedCurrency'))
    
    this.setState({
      defaultCurrency: type,
      open: false,
    });
    
    // 
    this.props.changeCurrency(type)
    
    console.log(type)


    // let products = JSON.parse(window.localStorage.getItem('data')) || []

    // window.localStorage.setItem('total', 0)
    // let amountIndex = parseInt(window.localStorage.getItem('SelectedCurrency'))

    // let productAmount, value = [];
    // products.forEach((product, index) => {
    //   productAmount = (product.prices[amountIndex].amount * product.count) 
    //   value.push(productAmount)
    // })
    // const sum = value.reduce(
    //   (initialValue, currentValue) => initialValue + currentValue, 0);
    // window.localStorage.setItem('total', JSON.stringify(sum))
  }

  render() {
    const { defaultCurrency, open } = this.state
    const { currency } = this.props

    let currencies = JSON.parse(window.localStorage.getItem("Currency"))
    const indexLength = currencies[defaultCurrency]?.currency?.symbol?.length

    return (
      <Wrap>
        <CurrencySymbol index={defaultCurrency} indexLength={indexLength}>
          {currencies[defaultCurrency]?.currency?.symbol}
        </CurrencySymbol>
        <ArrowContainer onClick={this.currencyDropdown}>
          <Arrow src={arrow} alt="Drop down" open={open}/>
        </ArrowContainer>

        <Drop ref={this.container}>
          {
          open && 
          currencies.map((money, index) => (
            <Dropdown key={index} onClick={()=>this.setCurrency(index)}>
              {money?.currency?.symbol} {money?.currency?.label}
            </Dropdown>
            ))
          }
        </Drop>
      </Wrap>
    )
  }
}

export default connect((state)=> ({currency: state.currentCurrency}), 
{ changeCurrency })(CurrencySelector)
