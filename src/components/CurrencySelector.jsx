import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'
import arrow from "../images/arrow.svg";


class CurrencySelector extends Component {
  static propTypes = {}
  constructor(props) {
    super(props)
    this.state = {
      defaultCurrency: JSON.parse(window.localStorage.getItem('SelectedCurrency')),
      open: false, 
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

export default CurrencySelector

const Wrap = styled.div`
  position: relative;
  display: inline-block;
  left: 20px;
`
const Arrow = styled.img`
  width: 11px;
  position: relative;
  right: 25px;
  margin-top: 15px;
  transform: ${props => props.open === true ? 'rotate(180deg)' : {}};
`
const Dropdown = styled.div`
  padding: 10px 14px;
  width: 114px;
  font-size: 22px;
  text-align: center;
  &:hover {
    background-color: rgba(0, 0, 0, 0.14);
    cursor: pointer;
  }
`
const Drop = styled.div`
  position: absolute;
  top: 100%;
  right: -2.5em;
  z-index: 3;
  border: 1px solid rgba(0, 0, 0, 0.04);
  background-color: white;
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);
  `
  const CurrencySymbol = styled.div`
  position: absolute;
  font-size: 22px;
  right: 50px;
  width: 100%;
  padding-right: ${props => props.indexLength > 1 && '10px'}
`
const ArrowContainer = styled.div`
`