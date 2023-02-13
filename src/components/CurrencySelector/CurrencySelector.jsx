import React, { Component } from 'react';
import PropTypes from 'prop-types'
import arrow from "../../images/arrow.svg";
import { connect } from "react-redux";
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
  constructor(props) {
    super(props);
    // state to hold the current currency and the currency dropdown
    this.state = {
      defaultCurrency: JSON.parse(window.localStorage.getItem('SelectedCurrency')) || 0,
      open: false,
    }
  }

  // clicking on all other areas on the app to close the currency dropdown
  container = React.createRef();
  componentDidMount() {
    // JSON.parse(window.localStorage.getItem('SelectedCurrency')) 
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  // function to close dropdown on the click of other areas
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

  /* function to hide and show currency symbol */
  currencyDropdown = () => {
    this.setState((state) => {
      return {
        open: !state.open,
      }
    })
  }

  /* function to set the current currency based on the index
    and also close the dropdown after selection. */
  setCurrency = (type) => {
    this.props.changeCurrency(type)

    this.setState(() => {
      return {
        defaultCurrency: type,
        open: false,
      }
    });
  }

  render() {
    const { defaultCurrency, open } = this.state
    let currencies = JSON.parse(window.localStorage.getItem("Currency"))

    // Get the currencies from local storage
    if(currencies === null || currencies === [] || currencies.length === 0) {
      currencies = []
    }
    
    if (!localStorage.SelectedCurrency) {
      localStorage.SelectedCurrency = 0;
      JSON.parse(window.localStorage.getItem('SelectCurrency'))
    }
    // Get the currency length to help handle multi-lettered currencies.
    const indexLength = currencies[defaultCurrency]?.currency?.symbol?.length;

    return (
      <Wrap>
        {/* Render the currency symbol */}
        <CurrencySymbol index={defaultCurrency} indexLength={indexLength}>
          {currencies[defaultCurrency]?.currency?.symbol}
        </CurrencySymbol>

        {/* Render the arrow toggleler infront of the currency symbol */}
        <ArrowContainer onClick={this.currencyDropdown}>
          <Arrow src={arrow} alt="Drop down" open={open}/>
        </ArrowContainer>

        {/* Render the dropdown */}
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

CurrencySelector.propTypes = {
  changeCurrency: PropTypes.func
}

/* connect the changeCurrency action to this component to help 
redux handle the currency changes */
export default connect(null, { changeCurrency })(CurrencySelector);
