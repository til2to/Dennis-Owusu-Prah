import styled from "styled-components";


export const Wrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: 5%;
`
export const PageWrap = styled.div`
  min-width: 20px;
  min-height: 20px;
  margin: 2px;
  font-size: 20px;
  border-bottom: ${props => props.indexVal == props.stateVal ? 
    '3px solid #5ece7b' : {}
  }
`
export const PageNumber = styled.a`
  color: #1d1f22;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;
  text-decoration: none;
  font-weight: bold;
`