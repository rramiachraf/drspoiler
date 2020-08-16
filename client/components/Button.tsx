import styled from '@emotion/styled'
import { primary, secondary } from '../styles/colors'

const Button = styled.button`
  cursor: pointer;
  text-transform: uppercase;
  background: ${primary};
  color: white;
  font-family: inherit;
  font-weight: 500;
  border: none;
  height: 4rem;
  padding: 1rem;
  font-size: 1.5rem;
  transition: 0.3s background;
  &:hover,
  &:active {
    background: ${secondary};
  }
`

export default Button
