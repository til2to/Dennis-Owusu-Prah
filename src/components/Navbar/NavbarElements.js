import styled from "styled-components";

export const Container = styled.div`
  height: 60px;
  z-index: 1;
  display: flex;
  justify-content: center;
`;
export const Wrapper = styled.div`
  position: fixed;
  z-index: 1;
  width: 99%;
  display: grid;
  grid-template-columns: 33.33%  33.33%  33.33%;
  grid-gap: 1rem;
`;
export const NavLeft = styled.div`
  display: flex;
  align-items: center;
`;
export const NavCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const LogoHolder = styled.img`
  position: relative;
  height: 28.62px;
  width: 31.18px;
  background: linear-gradient(316.98deg, #52d67a 16.86%, #5aee87 84.04%);
`;
export const NavLogo = styled.img`
  position: absolute;
  width: 14.08px;
  height: 8.99px;
`;
export const NavRight = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;
export const Currency = styled.img`
  margin-right: 10px;
`;
export const CurrencyItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 30px;
  margin-left: 10px;
`;
export const Bag = styled.div`
  margin-right: 20px;
  margin-left: 20px;
  position: relative;
  cursor: pointer;
  margin-top: 7px;
`;
export const TotalItems = styled.div`
  position: absolute;
  padding: 2px 5px;
  background: rgba(0, 0, 0, 0.73);
  border-radius: 50%;
  color: white;
  font-size: 12px;
  bottom: 10px;
  left: 8px;
`;
export const MyBag = styled.div``;

export const Symbol_Label = styled.div`
`;
export const ArrowContainer = styled.div``;
