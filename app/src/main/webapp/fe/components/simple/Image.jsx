import React from 'react';
import styled from 'styled-components';

const Picture = styled.img`
    width: 200px;
    display: block;
    margin: 10px 0;
`

const Image = ({src}) => <Picture src={src}/>

// Image.propTypes = {
//     src: React.PropTypes.string
// }

export default Image;

