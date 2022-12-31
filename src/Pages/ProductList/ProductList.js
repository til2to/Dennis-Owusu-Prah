import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { connect } from 'react-redux'
import Pagination from '../../components/pagination/Pagination'
import ProductItem from '../../components/ProductItem/ProductItem'
import { ALLPRODUCT_QUERY } from '../../Data/GraphqlData';
import { productsLength } from "../../actions/paginationActions";

import {
  Container,
  CategoryName,
  Wrap,
} from './ProductListElements'

class ProductList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 1,
      productsPerPage: 4,
    }
  }

  /* set total number of products to redux */ 
  setTotalProducts = (totalProducts) => {
    this.props.productsLength(totalProducts)
  }

  render() {
    let { name } = this.props.match.params
    const { productsSize } = this.props
    const { currentPage, productsPerPage } = this.state;
    const indexOfLastPost = currentPage * productsPerPage;
    const indexOfFirstPost = indexOfLastPost - productsPerPage;
    
    /* Change page */
    const changePage = pageNumber => {
      this.setState({currentPage: pageNumber})
    }

    return (
      <Container>
        <CategoryName>
          Category {name}
        </CategoryName>

        {/* Fetch data from graphql endpoint 
        and pass to product item as props */}
        <Query query={ALLPRODUCT_QUERY} variables={{ title: name }}>
          {
            ({ data, loading, error }) => {
              if (loading) return <span> Loading...</span>
              if (error) console.log(error.message)
              
              let totalProducts = data.category.products.length
              this.setTotalProducts(totalProducts) /* dispatch total products */

              let currentData = data.category.products.slice(
                indexOfFirstPost, indexOfLastPost
              )

              return <Wrap>
                {
                  currentData.map((prod, index) => {
                    return <ProductItem key={index} prod={prod} />
                  })
                }
              </Wrap>
            }
          }
        </Query>

        {/* Render pagination */}
        <Pagination productsPerPage={productsPerPage} 
          totalProducts={productsSize} changePage={changePage}
        />
      </Container>
    )
  }
}

/* Connect this component to the state */
export default connect((state) => ({ productsSize: state.pagination }),
 { productsLength, })(ProductList)
