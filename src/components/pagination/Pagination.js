import React, { Component } from 'react'

import {
  Wrapper,
  PageWrap,
  PageNumber,
} from './paginationElements'


class Pagination extends Component {
  constructor (props) {
    super(props);
    this.state = {
      activePage: 1,
    }
  }

  /* show active page number */ 
  activePageNumber = (page) => {
    this.setState({activePage: page})
  }

  render() {
    const { productsPerPage, totalProducts, changePage } = this.props
    const { activePage } = this.state;
    const pageNumbers = []

    for (let i=1; i<=Math.ceil(totalProducts/productsPerPage); i++){
      pageNumbers.push(i)
    }
    console.log(activePage)

    return (
      <Wrapper>
        {pageNumbers.map(number => (
          <PageWrap key={number} stateVal={activePage}
          indexVal={number}
          onClick={() => this.activePageNumber(number)}
          >
            <PageNumber href="#" onClick={() => changePage(number)}>
              {number}
            </PageNumber>
          </PageWrap>
        ))}
      </Wrapper>
    )
  }
}

export default Pagination
