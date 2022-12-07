import { FETCH_PRODUCTS } from '../Types';
import ApolloClient from 'apollo-boost'
import { gql } from 'graphql-tag';
import { InMemoryCache } from 'apollo-boost';

const client = new ApolloClient({
    uri: 'http://localhost:4000/gql',
    cache: new InMemoryCache()
  });
// takes a function and dispatches a new function
export const fetchProducts = () => (dispatch) => {
    client.query({
        query: gql`
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
    `})
    .then(result => console.log(result));

    // dispatch({
    //     type: FETCH_PRODUCTS,
    //     payload: data.category
    // });
}


// const ALLPRODUCT_QUERY = gql`
//     query productQuery($title: String!){ 
//         category(input: {title: $title}){
//           name
//           products{
//             inStock
//             name
//             id
//             brand
//             description
//             gallery

//             attributes{
//               id
//               type
//               name

//               items{
//                 id
//                 value
//                 displayValue
//               }
//             }
          
//             prices{
//               amount
//               currency{
//                 label
//                 symbol
//               }
//             }
//           }
//       }
//     }
// `