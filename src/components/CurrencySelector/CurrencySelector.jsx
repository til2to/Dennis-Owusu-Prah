import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'
import arrow from "../../images/arrow.svg";
import { connect } from "react-redux";
import { convertTotal } from "../../actions/cartActions";

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
    super(props)
    this.state = {
      defaultCurrency: JSON.parse(window.localStorage.getItem('SelectedCurrency')),
      open: false, 
      currencyChange: false,
    }
  }

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

  setCurrency = async (type) => {
    window.localStorage.setItem('SelectedCurrency', JSON.stringify(type))
    let currentCurrency = JSON.parse(window.localStorage.getItem('SelectedCurrency'))
    this.setState({defaultCurrency: currentCurrency})
    this.setState({open: false})
    
    this.setState({currencyChange: true})
  }

  render() {
    const { defaultCurrency, open } = this.state

    let currencies = JSON.parse(window.localStorage.getItem("Currency"))
    const indexLength = currencies[defaultCurrency]?.currency?.symbol.length

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

export default connect(null, { convertTotal })(CurrencySelector)
