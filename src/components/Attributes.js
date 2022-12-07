import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';


class Attributes extends Component {
  static propTypes = {}

  render() {
    const { item: { name, type, items }, handleClick, selectedAttributes } = this.props
    console.log(name)

    return (
      <Container>
        <Wrapper>
          <AttributeName>{name} :</AttributeName>
          <AttributesContainer>
            {
              type === 'swatch'
                ?
                items.map((color, id) => (
                  <ColorContainer key={color.id} color={color} onClick={() => handleClick(name, color.value)} 
                    isActive={selectedAttributes.hasOwnProperty(name) && selectedAttributes[name] === color.value ? true : false} />
                ) )
                :
                items.map((text, index) => (
                  <AttTextContainer key={index} onClick={() => handleClick(name, text.value)}
                    isActive={selectedAttributes.hasOwnProperty(name) && selectedAttributes[name] === text.value ? true : false}
                  >
                    {text.value}
                  </AttTextContainer>
                ))
            }
          </AttributesContainer>
        </Wrapper>
      </Container>
    )
  }
}

export default Attributes

const Container = styled.div`
  margin-top: 6px;
  margin-bottom: 10px;
`
const Wrapper = styled.div`
`
const AttributesContainer = styled.div`
  margin-top: 0px;
  display: flex;
`
const AttributeName = styled.span`
  font-weight: 700;
  margin-bottom: 10px;
  font-family: 'Roboto', sans-serif;
`
const AttTextContainer = styled.div`
  font-family: 'Source Sans Pro'; 
  margin-top: 0px;
  max-width: 65px;
  max-height: 45px; 
  border: 1px solid #A6A6A6;
  display: flex;
  justify-content: center;
  padding: 8px;
  box-sizing: border-box;
  margin: 6px;
  margin-left: 0;
  cursor: pointer;
  background: ${props => props.isActive ? '#1d1f22' : 'white'};
  color: ${props => props.isActive && 'white'};
`
const ColorContainer = styled.div`
  margin-top: 0px;
  min-width: 40px;
  max-height: 80px; 
  box-shadow: ${props => props.isActive && '0 4px 8px 0 rgba(0,0,0,0.5);'};
  border: 1px solid #1d1f22;;
  display: flex;
  justify-content: center;
  padding: 8px;
  box-sizing: border-box;
  margin: 6px;
  margin-left: 0;
  cursor: pointer;
  background: ${props => props.color.value};
`