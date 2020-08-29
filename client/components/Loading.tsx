import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'
import { primary } from '@colors'

const Loading = styled.div`
  background: ${primary};
  height: 100vh;
  position: relative;
`

const animation = keyframes`
    from {transform: translate(-50%, -50%) scale(.9)};
    to {transform: translate(-50%, -50%) scale(1.1)};
`

const Logo = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
  width: 10rem;
  animation: ${animation} .5s infinite;
`

export default () => (
  <Loading>
    <Logo src="/logo.png" />
  </Loading>
)
