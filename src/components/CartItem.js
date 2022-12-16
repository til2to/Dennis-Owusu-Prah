import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import prev from '../images/prev.png'
import nxt from '../images/nxt.png'
import decrease from '../images/decrease.png'
import increase from '../images/increase.png'
import incIcon from '../images/plus-square.png'
import decIcon from '../images/minus-square.png'
import { addCount, subCount } from '../actions/cartActions'
import { connect } from 'react-redux';

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
    let { name, brand, gallery, attributes, prices, count } = this.props.item
    let updateLocalcount = JSON.parse(window.localStorage.getItem('data'))

    let currentCount;
    updateLocalcount.forEach((localProduct) => {
      if (isSame(attributes, localProduct.attributes)) {
        console.log('equal')
        currentCount = localProduct.count
      }
    })

    function isSame (localProduct, currentProdut) {
      return JSON.stringify(localProduct) === JSON.stringify(currentProdut)
    }
    // let count = 
    const { noArrows, counter, cartItems } = this.props
    const { imageIndex } = this.state

    return (
      <Container>
        <LeftContainer>
          <CartInfo>
            <Brand>{brand}</Brand>
            <Name>{name}</Name>
            <Price>
              {prices[parseInt(window.localStorage.getItem("SelectedCurrency"))].currency.symbol} {" "} 
              {prices[parseInt(window.localStorage.getItem("SelectedCurrency"))].amount}
            </Price>
          </CartInfo>
          {
            attributes.map((item, index) => (
              <>
                <AttributeName key={index}>
                  {item.name}: 
                </AttributeName>
              
                <AttributesItems>
                  {
                    item.name === 'Color' ?
                    <ColorContainer style={{ backgroundColor: item.value, border: "1px solid #1d1f22" }} />
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

export default connect((state) => ({ cartItems: state.cart.cart, counter: state.cart.total }),
  { addCount, subCount })(CartItem)

const Container = styled.div`
  display: flex;
  border-top: 0.5px solid #e5e5e5;
`
const LeftContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`
const MidContainer = styled.div`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`
const RightContainer = styled.div`
  flex: 1
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Direction = styled.div`
  position: relative;
`
const Image = styled.img`
  width: 230px;
  height: 200px; 
  object-fit: contain;
  display: flex;
  flex-direction: column;
  margin-top: 5px;
`
const Next = styled.img`
`
const Previous = styled.img`
`
const PrevNext = styled.div`
  display: flex;
  width: 18px;
  height: 18px;
  position: absolute;
  bottom: 30px;
  left: ${props => props.direction === "right" ? "9em" : "7.5em"}
`
const Brand = styled.span`
  font-weight: 350;
  font-size: 21px;
  margin-bottom: 5px;
  font-family: 'Raleway', sans-serif;
`
const Name = styled.span`
  display: flex;
  font-family: 'Raleway', sans-serif;
  align-items: center;
  font-weight: 220;
  font-size: 21px;
  font-style: normal;
  color: #1D1F22;
`
const AttributesCont = styled.div`
  font-family: 'Source Sans Pro';
  min-width: 38px;
  min-height: 33px; 
  border: 1px solid #1D1F22;
  display: flex;
  justify-content: center;
  padding: 7px;
  box-sizing: border-box;
  margin: 6px;
  margin-left: 0;
  margin-bottom: 10px;
  cursor: pointer;
  background-color: '#1D1F22';
`
const AttributesItems = styled.div`
  display: flex;
`
const ColorContainer = styled.div`
  min-width: 38px;
  min-height: 25px; 
  border: 1px solid #1d1f22;
  display: flex;
  justify-content: center;
  padding: 8px;
  box-sizing: border-box;
  margin: 6px;
  margin-left: 0;
  cursor: pointer;
  margin-bottom: 10px;
`
const Price = styled.span`
  font-weight: 350;
  margin-top: 10px;
  margin-bottom: 5px;
  font-family: 'Raleway', sans-serif;
`
const CartInfo = styled.div`
  display: flex;
  flex-direction: column;
  Margin-top: 10px;
  Margin-bottom: 10px;
  justify-content: space-between;
`
const AttributeName = styled.div`
  font-family: 'Raleway', sans-serif;
`
const DecreaseIcon = styled.img`
  width: 15px;
  height: 1px;
  justify-content: center;
  align-items: center;
`
const AddCount = styled.div`
  width: 25px;
  height: 25px; 
  border: 1px solid #e5e5e5;
  display: flex;
  justify-content: center;
  padding: 6px;
  box-sizing: border-box;
  margin: 3px;
  align-items: center;
  margin-top: 10px;
  cursor: pointer;
`
const SubCount = styled.div`
  width: 25px;
  height: 25px; 
  border: 1px solid #e5e5e5;
  display: flex;
  padding: 6px;
  box-sizing: border-box;
  margin: 3px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
const Count = styled.div`
  display: flex;
  margin-right: 15px;
  justify-content: center;
  align-items: center;
`
const IncreaseIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  `
const VerticalIcon = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 7.5px;
  top: -8.5px;
`