import React, { Component } from 'react'
import PropTypes from 'prop-types'
import prev from '../../images/prev.png'
import nxt from '../../images/nxt.png'
import incIcon from '../../images/plus-square.png'
import decIcon from '../../images/minus-square.png'
import { addCount, subCount } from '../../actions/cartActions'
import { connect } from 'react-redux';

import {
  Container,
  MidContainer,
  LeftContainer,
  RightContainer,
  Direction,
  Image,
  Next,
  Previous,
  PrevNext,
  Brand,
  Name,
  AttributesCont,
  AttributesItems,
  ColorContainer,
  Price,
  CartInfo,
  AttributeName,
  DecreaseIcon,
  AddCount,
  SubCount,
  Count,
  IncreaseIcon
} from './CartItemElements'


class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0,
    };
  }
  static propTypes = {}

  handleNext = (imgIndex, gallery) => {
    imgIndex = imgIndex + 1;
    imgIndex < gallery.length && this.setState({imageIndex: imgIndex});
    return null;
  }

  handlePrevious = (imgIndex) => {
    imgIndex = imgIndex - 1;
    imgIndex >= 0  && this.setState({imageIndex: imgIndex});
    return null;
  }

  render() {
    let { name, brand, gallery, attributes, prices } = this.props.item
    let updateLocalcount = JSON.parse(window.localStorage.getItem('data'))
    const { noArrows, currentCurrency: {currentCurrency} } = this.props
    const { imageIndex } = this.state

    let currentCount;
    updateLocalcount.forEach((localProduct) => {
      if (isEqual(attributes, localProduct.attributes)) {
        currentCount = localProduct.count
      }
    })

    function isEqual (localProduct, currentProdut) {
      return JSON.stringify(localProduct) === JSON.stringify(currentProdut)
    }

    return (
      <Container>
        <LeftContainer>
          <CartInfo>
            <Brand>{brand}</Brand>
            <Name>{name}</Name>
            <Price>
              {prices[parseInt(window.localStorage.getItem("SelectedCurrency"))].currency.symbol}
              {" "} 
              {prices[parseInt(window.localStorage.getItem("SelectedCurrency"))].amount}
            </Price>
          </CartInfo>
          {
            attributes.map((item, index) => (
              <>
                <AttributeName key={index}>
                  {item.name}: 
                </AttributeName>
              
                <AttributesItems key={item.color}>
                  {
                    item.name === 'Color' ?
                    <ColorContainer style={{ backgroundColor: item.value, border: "1px solid #1d1f22" }} 
                    key={item.id}
                    />
                    :
                    <AttributesCont>{item.value}</AttributesCont>
                  }
                </AttributesItems>
              </>
            ))
          }
        </LeftContainer>
  
        <MidContainer>
          <AddCount onClick={() => this.props.addCount(attributes)} >
            <IncreaseIcon>
              <img src={incIcon} alt="" />
              {/* <VerticalIcon src={increase} /> */}
            </IncreaseIcon>
          </AddCount>

          <Count>{currentCount}</Count>
          
          <SubCount onClick={() => this.props.subCount(attributes)}>
            <img src={decIcon} alt="" />
            {/* <DecreaseIcon src={decIcon} /> */}
          </SubCount>
        </MidContainer>

        <RightContainer>
          <Direction>
            <Image src={gallery[this.state.imageIndex]} alt="product image" />
            {
              !noArrows && 
              gallery.length != 1 &&
              (
                <>
                  <PrevNext direction="right" onClick={() => this.handleNext(imageIndex, gallery)}>
                    <Next src={nxt} />
                  </PrevNext>
                  <PrevNext direction="left" onClick={() => this.handlePrevious(imageIndex)}>
                    <Previous src={prev} />
                  </PrevNext>
                </>
              )
            }
          </Direction>
        </RightContainer>
      </Container>
    )
  }
}

export default connect((state) => ({ cartItems: state.cart.cart, currentCurrency: state.currency }),
  { addCount, subCount, })(CartItem)
