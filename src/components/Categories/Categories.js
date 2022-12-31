import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import { CATEGORIES_QUERY } from '../../Data/GraphqlData'

import {
  Wrap,
  StyledLink,
  Wrapper,
} from './CategoriesElements'


class Categories extends Component {
  static propTypes = {}

  constructor(props){
    super(props)
    // Hold the current tab or category
    this.state = {
      activeIndex: 0,
    }
  }

  // Handle the current category or tab
  handleActive = (activeMenu) => {
    this.setState({activeIndex: activeMenu})
  }

  render() {
    const { activeIndex } = this.state

    // fecting categories
    return (
      <Query query={CATEGORIES_QUERY}>
        {
          ({ data, loading, error }) => {
            if (loading) return <h3>loading in categories</h3>
            if (error) console.log(error.message)
            
            // store categories
            const categoryArr = []
            data.categories.forEach((category) => {
              categoryArr.push(category.name)
            })

            // loop through the array and render each category
            return <Wrap>
              {
                categoryArr.map((category, index) => {
                  return (
                    <StyledLink to={`/products/${category}`} key={index}>
                      <Wrapper key={index} indexVal={index} stateVal={activeIndex} 
                      onClick={() => this.handleActive(index)}
                      > 
                        {category.toUpperCase()} 
                      </Wrapper>
                    </StyledLink>
                  )
                })
              }
            </Wrap>
          }
        }
      </Query>
    )
  }
}

export default Categories
