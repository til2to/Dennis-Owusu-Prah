import React, { Component } from "react";
import { Query } from "react-apollo";
import Attributes from "../../components/Attributes/Attributes";
import SideList from "../../components/SideList/SideList";
import { PRODUCT_QUERY } from "../../Data/GraphqlData";
import { connect } from "react-redux";
import { addToCart, } from "../../actions/cartActions";
import PropTypes from "prop-types";

import {
  Container,
  Wrapper,
  Name,
  Brand,
  Button,
  Empty,
  PriceInfo,
  AttributePrice,
  Image,
  ProductInfo,
  SideWrapper,
  ProductImg,
  AttributesContainer,
  ProductDescription,
} from './ProductDetailElements'


class ProductDetail extends Component {
  constructor(props) {
    super(props);
    /* state to hold the current image view of each product's main image,
    Also holds the attributes to be selected for each product */ 
    this.state = {
      index: 0,
      product: {},
    };
  }

  /* function to handle the key value of product's attributes */ 
  handleClick = (property, propertyValue) => {
    this.setState({
      product: { ...this.state.product, [property]: propertyValue },
    });
  };

  /* function to submit product to cart with the selected attributes */ 
  submitToCart = async (currentProduct) => {
    const objectArray = Object.entries(this.state.product); //convert object to array
    let newAttributes = []; // new array for product's attributes
    objectArray.forEach(([key, value]) => {
      newAttributes.push({ name: key, value: value });
    });

    // update the product's attributes
    let copied = JSON.parse(JSON.stringify(currentProduct));
    copied.attributes = newAttributes;

    // Store the original attributes before selection
    let setAttributes = []
 
    /* compare the setAttributes to the selected attributes 
    and use the differences as for preselection */ 
    if(copied.attributes.length !== currentProduct.length) {
      currentProduct.attributes.forEach((property) => {
        /* store and structure the setAttributes array as the 
        newAttributes array */
        setAttributes.push({name: property.name, value: property.items[0].value})
      })
      /* check for attributes in the setAttributes but not in the newAttributes
      and put those attributes in the newAttributes  */ 
      let result = setAttributes.filter(el1 => 
        !newAttributes.some(el2 => el1.name === el2.name));
      
      result.map(el => {
        newAttributes.push(el)
        return null
      })

      /* now using the action, send current product with the selected 
      and pre-selected attributes to cart in the store. */
      this.props.addToCart(copied)
      newAttributes = []
    }

    /* if the length of the attributes arrays are equal, do nothing 
    but send the product */ 
    else {
      this.props.addToCart(copied)
      newAttributes = []
    }
  };

  /* function set the state based on the index of the current image 
  to help change the side images */
  selectImage = (index) => {
    this.setState({ index: index });
  };

  render() {
    /* use params to add the current product id to the url */
    let { id } = this.props.match.params;
    const { index } = this.state;

    return (
      <Container>
        {/* Fetch the product and grab the it's id */}
        <Query query={PRODUCT_QUERY} variables={{ id: id }}>
          {({ loading, data, error }) => {
            if (loading) return <span>Loading...</span>;
            if (error) console.log(error);

            const { prices, gallery, name, brand, 
              description, attributes } = data.product;
              
            /* extract content from html tag */ 
            const regex = /(<([^>]+)>)/ig
            const body = description
            const regular = body.replace(regex, "");

            let parser = new DOMParser();
            let htmlDoc = parser.parseFromString(description, "text/html");
            let lis = htmlDoc.querySelectorAll("li");

            /* check if description contains ul or li tags */
            const checkForTags = (str) => {
              return str.includes("<ul>") || str.includes("<li>");
            }
            
            let result = "";
            for (let item of lis) {
              result += `• ${item.textContent}.\n`;
            }
            let lines = result.split("\n");

            const currentProduct = data.product; 
            const sideImgCount = gallery.length

            return (
              <Wrapper>
                <SideWrapper count={sideImgCount}>
                  <SideList gallery={gallery} tab={this.selectImage} />
                </SideWrapper>
                <ProductImg>
                  <Image src={gallery[index]} alt="" />
                </ProductImg>
                <ProductInfo>
                  <Brand>{brand}</Brand>
                  <Name>{name}</Name>
                  <AttributesContainer>
                    {/* loop through product's array and pass as 
                    props to attributes component */}
                    {data.product.attributes.map((item) => (
                      <Attributes
                        key={item.id}
                        item={item}
                        selectedAttributes={this.state.product}
                        handleClick={this.handleClick}                       
                      />
                    ))}
                    <PriceInfo>
                      <AttributePrice>PRICE: </AttributePrice>
                      <AttributePrice>
                        {/* Get the current currency */}
                        {
                          prices[
                            parseInt(
                              window.localStorage.getItem("SelectedCurrency")
                            )
                          ].currency.symbol
                        }
                        {" "}
                        {prices[parseInt(
                            window.localStorage.getItem("SelectedCurrency")
                          )].amount
                        }
                      </AttributePrice>
                    </PriceInfo>
                  </AttributesContainer>
                  {
                    /* Add click event to submit the current product to the 
                    cart with a count property */
                    attributes.length !== 0 ? 
                    (<Button 
                    onClick={() => this.submitToCart({ ...currentProduct, count:1 })}>
                      ADD TO CART
                    </Button>) : 
                    (<Empty>
                      Sorry! no attributes to select. Product already added to
                      cart
                    </Empty>)
                  }
                  {
                    checkForTags(description) ? 
                    (lines.map((line, index)=>{
                      return <ProductDescription key={index}>
                      {line}
                    </ProductDescription>
                    })) : regular
                  }
                </ProductInfo>
              </Wrapper>
            );
          }}
        </Query>
      </Container>
    );
  }
}

ProductDetail.propTypes = {
  addToCart: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
}

/* connect this component to the state for access to data */ 
export default connect((state) => ({currentCurrency: state.currency}),{ addToCart })(ProductDetail);