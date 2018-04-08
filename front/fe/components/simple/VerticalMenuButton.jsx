import React from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';

const Section = styled.div`

    background-color: ${props => props.theme.button};
    box-shadow: ${props => props.theme.buttonShadow};
    margin: ${props => `${(parseFloat(props.theme.shadowRadius) + 2)}px`};
    display: flex;
    justify-content: center;
        
    &:hover {
            background-color: ${props => props.theme.border};
            cursor: pointer;
    }
    
    
    a {
        color: ${props => props.theme.text}
    }
   
    &.active {
         background-color: ${props => props.theme.text};
         color: ${props => props.theme.button};
    }
`

const VerticalMenuButton = ({onClick, to, text}) => {
    return (
        <Section onClick={onClick}>
            <NavLink exact={true} to={to}>
                {text}
            </NavLink>
        </Section>
    );
}

// VerticalMenuButton.propTypes = {
//     text: React.PropTypes.string,
//     to: React.PropTypes.string,
//     onClick: React.PropTypes.func
// }
//
// VerticalMenuButton.defaultProps = {
//     text: 'button'
// }
export default VerticalMenuButton;