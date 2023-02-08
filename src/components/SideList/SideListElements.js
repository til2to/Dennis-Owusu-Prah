import styled from 'styled-components'

export const Container = styled.div`
  justify-content: flex-end;
  max-height: ${props => props.count > 3 ? '280px' : {}};
  overflow-y: ${props => props.count > 3 ? 'scroll' : {}};
`
export const SideImage = styled.img`
  width: 130px;
  height: 90px; 
  object-fit: contain;
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  cursor: pointer;
`;