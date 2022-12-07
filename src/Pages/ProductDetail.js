import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'


export class ProductPage extends Component {
  static propTypes = {}

  render() {
    const {gallery} = this.props

    return (
      <Container>
        <Wrapper>
          <ProductImg>
            <Image_ src={gallery[0]} alt="" />
          </ProductImg>
          <ProductInfo>
            <Brand>Apollo</Brand>

            <Name>Running Short</Name>

            <AttributesContainer>
              <AttributeType>SIZE:</AttributeType>
              <AttributeItems>
                <SizeContainer>
                  <Size>XS</Size>
                </SizeContainer>
                <SizeContainer>
                  <Size>XS</Size>
                </SizeContainer> 
                <SizeContainer>
                  <Size>XS</Size>
                </SizeContainer> 
                <SizeContainer>
                  <Size>XS</Size>
                </SizeContainer>   
              </AttributeItems>
              <AttributeType>COLOR:</AttributeType>
              <AttributeItems>4,6,9,2</AttributeItems>
              <Price>
                <AttributeType>PRICE:</AttributeType>
                <AttributeType>$50.00</AttributeType>
              </Price>
            </AttributesContainer>

            <Button>ADD TO CART</Button>

            <ProductDescription>
              <br /><p>A good gaming console. Plays games of PS4! Enjoy if you can buy it mwahahahaha</p>
            </ProductDescription>

          </ProductInfo>
        </Wrapper>
      </Container>
    )
  }
}

export default ProductPage

const Container = styled.div`
  
`
const Wrapper = styled.div`
  display: flex;
  justify-content: center;

`
const ProductImg = styled.div`
  margin-right: 25px;
  // margin-top: -10px;
  box-sizing: border-box;
  flex: 1
   `
const Image_ = styled.img`
  max-height: 50%;
  margin-left: -20px;
  border: 0.5px ;
  
   `
const ProductInfo = styled.div`
  // margin-left: 30px;
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  // flex:1;
  margin-right: 100px;
`
const Brand = styled.span`
  font-weight: 400;
  font-size: 30px;
  line-height: 27px;
  margin-top: 15px;
  margin-bottom: 15px;
`
const Name = styled.span`
  line-height: 27px;
  width: 192;
  display: flex;
  align-items: center;
  font-weight: 250;
  font-size: 30px;
  font-style: normal;
  color: #1D1F22;
`
const AttributesContainer = styled.div`
  margin-top:20px;
`
const AttributeType = styled.span`
  font-weight: 700;
  margin-bottom: 10px;
  
`
const AttributeItems = styled.div`
  margin-top: 10px;
  margin-bottom: 25px;
  display: flex;
  
`
const Price = styled.span`
  display: flex;
  flex-direction: column;
  
`
const Button = styled.div`
  font-weight: 600;
  color: white;
  background-color: #5ECE7B;
  height: 40px;
  width: 250px;
  display: flex;
  justify-content: center;
  border-radius: 3px; 
  opacity: 0.85;
  font-size: 13px;
  cursor: pointer;
  margin-top: 20px;
  align-items: center;  
`
const ProductDescription = styled.div`
  width: 256px;
  display: flex;
  flex-wrap: wrap; 
  font-size: 16px;
`
const SizeContainer = styled.div`
  max-width: 63px;
  max-height: 45px; 
  border: 1px solid #A6A6A6;
  display: flex;
  justify-content: center;
  padding: 8px;
  box-sizing: border-box;
  margin: 6px;
  margin-left: 0;
`
const Size = styled.div`
  font-size: 13px;
  padding: 10px;
  display: flex;
  align-items: center;
`
const ColorContainer = styled.div`

`
const Color = styled.div`

`