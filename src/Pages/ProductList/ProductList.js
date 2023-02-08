import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Query } from 'react-apollo'
import { connect } from 'react-redux'
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
      productsPerPage: 8,
      categoryNumber: 0,
    }
  }

  /* set total number of products to redux */ 
  setTotalProducts = (totalProducts) => {
    this.props.productsLength(totalProducts)
  }

  render() {
    let { name } = this.props.match.params
    const { currentPage, productsPerPage, } = this.state;
    const indexOfLastPost = currentPage * productsPerPage;
    const indexOfFirstPost = indexOfLastPost - productsPerPage;
    /* Change page */
    // const changePage = pageNumber => {
    //   this.setState({currentPage: pageNumber})
    // }

    return (
       <Container>
        <CategoryName>
          Category {name}
        </CategoryName>

        {/* Fetch data from graphql endpoint 
        and pass to product item as props */}
        <Query query={ALLPRODUCT_QUERY} variables={{ title: name }} >
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
                  currentData.map((prod, index) =>
                    <ProductItem key={index} prod={prod} />
                  )
                }
              </Wrap>
            }
          }
        </Query>
      </Container>
    )
  }
}

ProductList.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      name: PropTypes.string
    })
  }),
  productsLength: PropTypes.func,
}

/* Connect this component to the state */
export default connect(null, { productsLength, })(ProductList);
