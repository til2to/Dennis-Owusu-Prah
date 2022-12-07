import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import { CATEGORIES_QUERY } from '../Data/GraphqlData'
import { NavLink as BaseNavLink} from 'react-router-dom';
import { Link } from 'react-router-dom';


class Categories extends Component {
  static propTypes = {}

  constructor(props){
    super(props)
    this.state = {
      activeIndex: 0,
    }
  }

  handleActive = (activeMenu) => {
    this.setState({activeIndex: activeMenu})
  }

  render() {
    const { activeIndex } = this.state

    return (
      <Query query={CATEGORIES_QUERY}>
        {
          ({ data, loading, error }) => {
            if (loading) return <h3>loading in categories</h3>
            if (error) console.log(error.message)

            const categoryArr = []
            data.categories.forEach((category) => {
              categoryArr.push(category.name)
            })

            return <Wrap>
              {
                categoryArr.map((category, index) => 
                  <>
                    <Link to={`/products/${category}`} style={{textDecoration: "none", display: "flex"}}>
                      <Wrapper key={index} indexVal={index} stateVal={activeIndex} 
                      onClick={() => this.handleActive(index)}> 
                        {category.toUpperCase()} 
                      </Wrapper>
                    </Link>
                  </>
                )
              }
            </Wrap>
          }
        }
      </Query>
    )
  }
}

export default Categories

const Container = styled.div`
`
const Wrap = styled.div`
 display: flex;  
`
const Wrapper = styled.span`
  padding: 10px;
  max-width: 150px;
  color: #000;
  padding-bottom: 20px;
  border-bottom: ${props => props.indexVal == props.stateVal ? 
    '1px solid #5ece7b' : {}
  } 
`