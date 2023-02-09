import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  margin-top: 8%;
`
export const CategoryName = styled.div`
  font-weight: 250;
  font-size: 25px;
  overflow-y: hidden;
  z-index: 1;
`
export const PaginationContainer = styled.div`
  position: relative;
  bottome: 0;
`
export const Wrap = styled.div`
  display: grid;
  grid-template-columns: 33.33%  33.33%  33.33%;
  grid-gap: 1rem;
  grid-auto-flow: row;
  margin: 40px 0;
`;