import React, { Component } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import Attributes from "../../components/Attributes/Attributes";
import SideList from "../../components/SideList/SideList";
import { PRODUCT_QUERY } from "../../Data/GraphqlData";
import { connect } from "react-redux";
import { addToCart, } from "../../actions/cartActions";

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
  SideImgContainer,
  ProductImg,
  AttributesContainer,
  ProductDescription,
  SideImage,
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

  static propTypes = {};

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
    let setAttribtes = []
 
    /* compare the setAttributes to the selected attributes 
    and use the differences as for preselection */ 
    if(copied.attributes.length !== currentProduct.length) {
      currentProduct.attributes.forEach((property) => {
        /* store and structure the setAttributes array as the 
        newAttributes array */
        setAttribtes.push({name: property.name, value: property.items[0].value})
      })
      /* check for attributes in the setAttributes but not in the newAttributes
      and put those attributes in the newAttributes  */ 
      let result = setAttribtes.filter(el1 => 
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
              
            /* use the all the properties to define the product */
            const currentProduct = data.product; 

            return (
              <Wrapper>
                <SideImgContainer>
                  <SideWrapper>
                    {/* Add click event to change the side image to the selected one */}
                    {
                      gallery.map((item, index) => (
                        <SideImage src={item} key={index} 
                        onClick={()=>this.selectImage(index)}
                        />
                      ))
                    }
                  </SideWrapper>
                </SideImgContainer>
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
                  <ProductDescription>
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                  </ProductDescription>
                </ProductInfo>
              </Wrapper>
            );
          }}
        </Query>
      </Container>
    );
  }
}

/* connect this component to the state for access to data */ 
export default connect((state) => ({currentCurrency: state.currency}),{ addToCart })(ProductDetail)