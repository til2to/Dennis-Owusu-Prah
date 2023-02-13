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
  submitToCart = async (currentProduct, inStock) => {
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

      /* using the action, send current product with the selected 
      and pre-selected attributes to cart in the store. */
      inStock && this.props.addToCart(copied)
      newAttributes = []
    }

    /* if the length of the attributes arrays are equal, do nothing 
    but send the product */ 
    else {
      inStock && this.props.addToCart(copied)
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

            const { prices, gallery, name, brand, inStock,
              description, attributes } = data.product;

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

            /* extract content without li tag */ 
            const content = description.split("\n").filter(line => line.trim() !== "");

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
                    {attributes.map((item) => (
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
                          )].amount.toFixed(2)
                        }
                      </AttributePrice>
                    </PriceInfo>
                  </AttributesContainer>
                  {
                    /* Add click event to submit the current product to the 
                    cart with a count property */
                    <Button 
                    onClick={() => this.submitToCart({ ...currentProduct, count:1 }, inStock)}>
                      ADD TO CART
                    </Button>
                  }
                  {
                    checkForTags(description) ? 
                    (lines.map((line, index) => {
                      return <ProductDescription key={index}>
                      {line}
                    </ProductDescription>
                    })) : content.map((line, index) => {
                      return <ProductDescription key={index}>
                        {line.replace(/<[^>]+>/g, '')}
                      </ProductDescription>
                    })
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