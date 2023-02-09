import styled from "styled-components";

export const Wrap = styled.div`
  position: relative;
`
/* Add props to toggle the litle arrow at the currency symbol */
export const Arrow = styled.img`
  width: 11px;
  position: relative;
  right: 25px;
  margin-top: 15px;
  transform: ${props => props.open === true ? 'rotate(180deg)' : {}};
`
export const Dropdown = styled.div`
  padding: 10px 14px;
  width: 110px;
  font-size: 20px;
  text-align: center;
  &:hover {
    background-color: rgba(0, 0, 0, 0.14);
    cursor: pointer;
  }
`
export const Drop = styled.div`
  position: absolute;
  top: 100%;
  right: 0.001em;
  z-index: 3;
  border: 1px solid rgba(0, 0, 0, 0.04);
  background-color: white;
  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14);
`
/* Add props to help in providing equal 
spacing even with multi-lettered currencies.*/ 
export const CurrencySymbol = styled.div`
  position: absolute;
  font-size: 22px;
  right: 50px;
  width: 100%;
  padding-right: ${props => props.indexLength > 1 && '8px'};
`
export const ArrowContainer = styled.div`
`
