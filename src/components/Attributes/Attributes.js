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
  constructor(props){
    super(props)
    this.keyCount = 0;
    this.getKey = this.generateKey.bind(this);
  }
  static propTypes = {}
  
  generateKey(){
    return this.keyCount++;
  }

  render() {
    // Incoming data as props from Product Detail component/Page
    const { item: { name, type, items }, handleClick, selectedAttributes } = this.props

    console.log(selectedAttributes)
    console.log(items)
    return (
      <Container>
        <Wrapper>
          <AttributeName>{name} :</AttributeName>
          <AttributesContainer>
            {/* Render attributes of products based on text or color code */}
            {
              // type === 'swatch'
              //   ?
              //   items.map((color, id) => (
              //     <ColorContainer key={color.id} color={color} onClick={() => handleClick(name, color.value)} 
              //       isActive={selectedAttributes.hasOwnProperty(name) && selectedAttributes[name] === color.value ? true : false} />
              //   ) )
              //   :
              //   items.map((text, index) => (
              //     <AttTextContainer key={index} onClick={() => handleClick(name, text.value)}
              //       isActive={selectedAttributes.hasOwnProperty(name) && selectedAttributes[name] === text.value ? true : false}
              //     >
              //       {text.value}
              //     </AttTextContainer>
              //   ))

              items.map((item, index) => {
              //   return <>
              //     {type === 'swatch' ? 
              //     (<ColorContainer key={this.generateKey()} color={item.value} onClick={() => handleClick(name, item.value)} 
              //     isActive={selectedAttributes.hasOwnProperty(name) && 
              //     selectedAttributes[name] === item.value ? true : false} 
              //     />):
              //     (<AttTextContainer key={index} onClick={() => handleClick(name, item.value)}
              //     isActive={selectedAttributes.hasOwnProperty(name) && 
              //     selectedAttributes[name] === item.value ? true : false}
              //     >
              //       {item.value}
              //     </AttTextContainer>)
              //   }
              // </>

                if(type === "swatch"){
                  return (
                    <ColorContainer key={this.generateKey()} color={item.value} 
                    onClick={() => handleClick(name, item.value)} 
                    isActive={selectedAttributes.hasOwnProperty(name) && 
                    selectedAttributes[name] === item.value ? true : false} 
                    />
                  )
                }
                if(type === "text"){
                  console.log(item.value)
                  return (
                    <AttTextContainer key={this.generateKey()} text={item.value}
                    onClick={() => handleClick(name, item.value)}
                    isActive={selectedAttributes.hasOwnProperty(name) && 
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

export default Attributes