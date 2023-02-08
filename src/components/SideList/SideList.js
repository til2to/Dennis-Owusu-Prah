import React, { Component } from 'react';
import PropTypes from "prop-types";

import {
  Container,
  SideImage,
} from './SideListElements'


export class SideList extends Component {
  static propTypes = {}

  render() {
    const {gallery, tab } = this.props;
    const count = gallery.length;

    return (
      <Container count={count}>
        {
          gallery.map((item, index) => (
            <SideImage src={item} key={index} 
            onClick={()=>tab(index)}/>
          ))
        }
      </Container>
    )
  }
}

SideList.propTypes = {
  gallery: PropTypes.array,
  tab: PropTypes.func
}

export default SideList;
