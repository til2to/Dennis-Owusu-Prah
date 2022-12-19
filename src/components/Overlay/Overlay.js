import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MyBag from '../MyBag/MyBag'
import onClickOutside from "react-onclickoutside";

import {
  Wrapper,
  BagStyle
} from './OverlayElements'


class Overlay extends Component {
  static propTypes = {}

  constructor(props) {
    super(props);
    this.state={
      visible: true,
    } 
  }

  render() {
    const { hideOverlay } = this.props

    return (
      <>
        {this.state.visible && 
          <Wrapper onClick={hideOverlay}>
            <BagStyle onClick={(e)=> e.stopPropagation()}>
              <MyBag hideOverlay={hideOverlay} />
            </BagStyle>
          </Wrapper>
        }
      </>
    )
  }
}

export default Overlay
