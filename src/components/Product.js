import React, { Component } from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import styled from "styled-components";
import Attributes from "./Attributes";
import SideList from "./SideList";
import { PRODUCT_QUERY } from "../Data/GraphqlData";
import { connect } from "react-redux";
import { addToCart, getCart } from "../actions/cartActions";

class Product extends Component {
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
    const { index } = this.state;

    return (
      <Container>
        <Query query={PRODUCT_QUERY} variables={{ id: id }}>
          {({ loading, data, error }) => {
            if (loading) return <h1>Loading...</h1>;
            if (error) console.log(error);

            const { prices, gallery, name, brand, description, attributes } = data.product;
            const currentProduct = data.product;
            console.log(currentProduct)

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

export default connect(null, { addToCart, getCart })(Product);

const Container = styled.div`
  justify-content: center;
  padding: 10px;
  margin-left: 25px;
  margin-right: 25px;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProductImg = styled.div`
  display: flex;
  box-sizing: border-box;
  flex: 1;
  margin-left: 20px;
  margin-top: 15px;
  justify-content: center;
  max-width: 480px;
`;
const Image = styled.img`
  display: flex;
  max-height: 50%;
  border: 0.5px;
  widht: 400px;
  height: 500px;
`;
const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 30px;
  margin-left: 40px;
`;
const Brand = styled.span`
  font-weight: 400;
  font-size: 25px;
  line-height: 27px;
  margin-top: 15px;
  margin-bottom: 15px;
`;
const Name = styled.span`
  line-height: 27px;
  width: 192;
  display: flex;
  align-items: center;
  font-weight: 250;
  font-size: 25px;
  font-style: normal;
  color: #1d1f22;
`;
const AttributesContainer = styled.div`
  margin-top: 15px;
`;
const AttributePrice = styled.span`
  font-weight: 700;
  margin-bottom: 10px;
`;
const PriceInfo = styled.span`
  display: flex;
  flex-direction: column;
`;
const Button = styled.div`
  font-weight: 600;
  color: white;
  background-color: #5ece7b;
  height: 40px;
  width: 250px;
  display: flex;
  justify-content: center;
  border-radius: 3px;
  opacity: 0.85;
  font-size: 13px;
  cursor: pointer;
  margin-top: 5px;
  margin-bottom: 10px;
  align-items: center;
`;
const ProductDescription = styled.div`
  font-family: 'Roboto', sans-serif;
  width: 256px;
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;
  margin-top: 5px;
`;
const SideImgContainer = styled.div`
  margin-left: 20px;
  margin-top: 100px;
`;
const SideWrapper = styled.div`
  margin-left: 20px;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
`;
const SideImageC = styled.img`
  max-width: 130px;
  height: 90px;
  object-fit: contain;
  margin-bottom: 5px;
  cursor: pointer;
`;
const Empty = styled.span`
  color: red;
  font-size: 18px;
  font-weight: 500px;
  flex-wrap: wrap;
`;
