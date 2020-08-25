import styled from '@emotion/styled'
import { rgba } from 'polished'
import { primary } from '@colors'

export default styled.div`
  background: white;
  position: absolute;
  top: 4rem;
  right: 0;
  width: 20rem;
  height: auto;
  list-style: none;
  display: grid;
  cursor: default;
  border: 1px solid ${primary};
  border-radius: 0 0 3px 3px;
  font-weight: 400;
  padding: 0.5rem 0;
  box-shadow: 0 2px 0 ${rgba(primary, 0.4)};
  li {
    color: ${primary};
    text-transform: capitalize;
    cursor: pointer;
    padding: 1rem 2rem;
    transition: 0.2s background;
    &:hover {
      background: ${primary};
      color: white;
    }
  }
`
