import React from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';

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

const VerticalMenuButton = ({to, text}) => {
    return (
        <Section>
            <NavLink exact={true} to={to}>
                {text}
            </NavLink>
        </Section>
    );
}

VerticalMenuButton.propTypes = {
    text: PropTypes.string,
    to: PropTypes.string.required
}

export default VerticalMenuButton;