import React, { Component } from 'react'
import PropTypes from "prop-types";

import {
  Container,
  Wrapper,
  AttributesContainer,
  AttributeName,
  AttTextContainer,
  ColorContainer
} from './AttributesElements';


class Attributes extends Component {
  static propTypes = {}

  render() {
    // Incoming data as props from Product Detail component/Page
    const { item: { name, type, items }, handleClick, selectedAttributes } = this.props
    return (
      <Container>
        <Wrapper>
          <AttributeName>{name} :</AttributeName>
          <AttributesContainer>
            {/* Render attributes of products based on text or color code */}
            {
             items.map((item, index) => {
                if(type === "swatch"){
                  return (
                    <ColorContainer key={`color${index}`} color={item.value} 
                    onClick={() => handleClick(name, item.value)} 
                    isActive={Object.prototype.hasOwnProperty.call(selectedAttributes, name) && 
                    selectedAttributes[name] === item.value ? true : false} 
                    />
                  )
                }
                if(type === "text"){
                  return (
                    <AttTextContainer key={`text${index}`} text={item.value}
                    onClick={() => handleClick(name, item.value)}
                    isActive={Object.prototype.hasOwnProperty.call(selectedAttributes, name) && 
                    selectedAttributes[name] === item.value ? true : false}
                    >
                      {item.value}
                    </AttTextContainer>
                  )
                }
                return null
              })
            }
          </AttributesContainer>
        </Wrapper>
      </Container>
    )
  }
}

Attributes.propTypes = {
  noArrows: PropTypes.bool,
  item: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    items: PropTypes.array
  }),
  handleClick: PropTypes.func,
  selectedAttributes: PropTypes.object
}

export default Attributes