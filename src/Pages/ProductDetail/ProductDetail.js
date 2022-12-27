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
  ProductDescription
} from './ProductDetailElements'


class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      product: {},
    };
  }

  static propTypes = {};

  handleClick = (property, propertyValue) => {
    this.setState({
      product: { ...this.state.product, [property]: propertyValue },
    });
  };

  submitToCart = async (currentProduct) => {
    const objectArray = Object.entries(this.state.product); //convert object to array
    let newAttributes = [];
    objectArray.forEach(([key, value]) => {
      newAttributes.push({ name: key, value: value });
    });

    let copied = JSON.parse(JSON.stringify(currentProduct));
    copied.attributes = newAttributes;

    let setAttribtes = []
 
    if(copied.attributes.length !== currentProduct.length) {
      currentProduct.attributes.forEach((property) => {
        setAttribtes.push({name: property.name, value: property.items[0].value})
      })
      let result = setAttribtes.filter(el1 => 
        !newAttributes.some(el2 => el1.name === el2.name));
      
      result.map(el => {
        newAttributes.push(el)
      })
      this.props.addToCart(copied)
    }

    else {
      const added = this.props.addToCart(copied)
      // newAttributes = []
    }
  };

  handleTab = (index) => {
    this.setState({ index: index });
  };

  componentDidMount() {
    const { index } = this.state;
  }

  render() {
    let { id } = this.props.match.params;
    const { index, currentCount } = this.state;
    const { currentCurrency: {currentCurrency} } = this.props

    return (
      <Container>
        <Query query={PRODUCT_QUERY} variables={{ id: id }}>
          {({ loading, data, error }) => {
            if (loading) return <h1>Loading...</h1>;
            if (error) console.log(error);

            const { prices, gallery, name, brand, description, attributes } = data.product;
            const currentProduct = data.product;

            return (
              <Wrapper>
                <SideImgContainer>
                  <SideWrapper>
                    <SideList gallery={gallery} tab={this.handleTab} />
                  </SideWrapper>
                </SideImgContainer>
                <ProductImg>
                  <Image src={gallery[index]} alt="" />
                </ProductImg>
                <ProductInfo>
                  <Brand>{brand}</Brand>
                  <Name>{name}</Name>
                  <AttributesContainer>
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
                  {attributes !== "" ? (
                    <Button 
                    onClick={() => this.submitToCart({ ...currentProduct, count:1 })}>
                      ADD TO CART
                    </Button>
                  ) : (
                    <Empty>
                      {/* Sorry! no attributes to select. Product already added to
                      cart */}
                      {console.log('attributes empty')}
                    </Empty>
                  )}
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

export default connect((state) => ({currentCurrency: state.currency}),{ addToCart })(ProductDetail)