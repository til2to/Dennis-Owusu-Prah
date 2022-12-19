import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  Container,
  Wrapper,
  SideImage,
} from './SideListElements'


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
