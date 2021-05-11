import styled from 'styled-components'

interface WrapperProps {
    width?: number;
    height?: number;
    radius?: string | number;
}

const ImageWrapper = styled.div<WrapperProps>`
    position: relative;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    overflow: hidden;
    boder-radius: ${props => typeof props.radius === 'number' ? props.radius + 'px' : props.radius};
`

export default ImageWrapper