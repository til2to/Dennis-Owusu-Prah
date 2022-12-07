import { gql } from 'graphql-tag'

// data for products of all categories
const ALLPRODUCT_QUERY = gql`
    query productQuery($title: String!){ 
        category(input: {title: $title}){
          name
          products{
            inStock
            name
            id
            brand
            description
            gallery

            attributes{
              id
              type
              name

              items{
                id
                value
                displayValue
              }
            }
          
            prices{
              amount
              currency{
                label
                symbol
              }
            }
          }
      }
    }
`
export { ALLPRODUCT_QUERY }


// Data for single product
const PRODUCT_QUERY = gql`
    query productQuery($id: String!){ 
        product(id: $id){
            inStock
            name
            id
            brand
            description
            gallery

            attributes{
                name
                type
                id
                items{
                    value
                    displayValue
                    id
                }
            }
             
            prices{
                amount
                currency{
                    label
                    symbol
                }
            }
      }
    }
`
export { PRODUCT_QUERY }


const CATEGORIES_QUERY = gql`
    query categoriesQuery{ 
        categories{
          name
        }
    }
`
export { CATEGORIES_QUERY }


const PRICE_QUERY = gql`
  query productQuery { 
    category {
      products {
        prices {
          amount
          currency {
            label
            symbol
          }
        }
      }
    }
  }
`
export {PRICE_QUERY}