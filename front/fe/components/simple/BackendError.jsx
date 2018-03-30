import React from 'react';
import styled from 'styled-components';

const Error = styled.div`
    background-color: ${props => props.theme.error_background};
    color: ${props => props.theme.error_text};
    box-shadow: 0px 0px 3px 3px ${props => props.theme.error_text};
    font-weight: 700;
    padding: 10px;
    transition: color 3s linear;
    margin: 10px 20px 10px 0px;
`

const BackendError = ({message, className}) => {
    return message ? (<Error className={className}>{message}</Error>) : null;
}

// BackendError.propTypes = {
//     message: React.PropTypes.string
// }
//
// BackendError.defaultProps = {
//     message: 'error occurs without message'
// }

export default BackendError;