import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export class SideList extends Component {
  static propTypes = {}

  render() {
    const { gallery_item } = this.props;
    const {gallery, tab, myRef} = this.props;
  
    return (
      <Container>
        <Wrapper>
          <div className='side_images' ref={myRef}>
            {
            gallery.map((gallery_item, index) => (
              <SideImage src={gallery_item} key={index} 
              onClick={()=>tab(index)}/>
            ))
          }
          </div>
        </Wrapper>
      </Container>
    )
  }
}

export default SideList

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
`
const Wrapper = styled.div`
  margin-left: 20px;
`
const SideImage = styled.img`
  width: 130px;
  height: 90px; 
  object-fit: contain;
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  cursor: pointer;
`