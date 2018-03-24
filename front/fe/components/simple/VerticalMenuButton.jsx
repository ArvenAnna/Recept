import React from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import {HeaderButton} from "../styled/buttons.jsx";

const Section = styled.div`
    margin: 8px 0;
    
    a {
        color: ${props => props.theme.text}
    }
    
    &:last-of-type {
        margin: 8px 0 0 0;
    }
    
    &:first-of-type {
        margin: 0 0 8px 0;
    }
    
    .active {
        button {
            background-color: ${props => props.theme.text};
            color: ${props => props.theme.button};
        }
    }
`

const VerticalMenuButton = ({onClick, to, text}) => {
    return (
        <Section>
            <NavLink exact={true} to={to}>
                <HeaderButton onClick={onClick}>{text}</HeaderButton>
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