import styled from '@emotion/styled'
import { primary, secondary } from '@colors'

const Button = styled.button`
  cursor: pointer;
  text-transform: uppercase;
  background: ${primary};
  color: white;
  font-family: inherit;
  font-weight: 500;
  border: none;
  padding: 1rem;
  border-radius: 3px;
  font-size: 1.5rem;
  transition: 0.3s background;
  &:hover,
  &:active {
    background: ${secondary};
  }
`

export default Button
