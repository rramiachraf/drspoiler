import styled from '@emotion/styled'
import { primary, lightGreenGray } from '@colors'

export default styled.input`
  box-sizing: border-box;
  height: 4rem;
  padding: 1rem;
  background: white;
  border: 2px solid ${lightGreenGray};
  color: ${primary};
  font-size: 1.5rem;
  font-family: inherit;
  border-radius: 3px;
  transition: 0.3s border ease;
  &:focus {
    border: 2px solid ${primary};
  }
`
