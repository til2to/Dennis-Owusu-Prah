import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
    const { item: { name, type, items }, handleClick, selectedAttributes } = this.props

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