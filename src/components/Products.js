import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import styled from 'styled-components'
import ProductItem from './ProductItem'
import ProductPage from '../Pages/ProductDetail'
import { ALLPRODUCT_QUERY } from '../Data/GraphqlData'
import { fetchProducts } from '../actions/ProductsActions';
import { connect } from 'react-redux';


class Products extends Component {
  
  render() {
    let { name } = this.props.match.params
    const pageSize = 12;
    return (
      <Container>
        <CategoryName>
          Category {name}
        </CategoryName>

        <Query query={ALLPRODUCT_QUERY} variables={{ title: name }}>
          {
            ({ data, loading, error }) => {
              if (loading) return <h4> Loading.</h4>
              if (error) console.log(error.message)
              
              return <Wrap>
                {
                  data.category.products.map(prod => (
                    <ProductItem key={prod.id} prod={prod} />
                  ))
                }
              </Wrap>
            }
          }
        </Query>
      </Container>
    )
  }
}

export default connect((state) => ({ products: state.products }),
  { fetchProducts, })(Products)

const Container = styled.div`
  padding: 10px;
  margin-: 0 25px;
`
const CategoryName = styled.div`
  font-weight: 250;
  font-size: 25px;
  margin: 45px 0 100px 0;
`
const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 50px 0;
`