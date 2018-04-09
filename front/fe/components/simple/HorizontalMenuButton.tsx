import * as React from 'react';
import {NavLink} from 'react-router-dom';
import styled from 'styled-components';
import {ActionButton} from '../styled/buttons.jsx';

//noinspection TypeScriptUnresolvedVariable
const Section = styled.div`
    margin: 0.3rem;
    
    .active {
        button {
            background-color: ${props => props.theme.text};
            color: ${props => props.theme.button};
        }
    }
`

interface HorizontalMenuButtonProps {
    text: string;
    to: string;
    onClick: () => void;
}

const HorizontalMenuButton = ({onClick, text, to}: HorizontalMenuButtonProps) => {
    return (
        <Section>
            <NavLink to={to}>
                <ActionButton onClick={onClick}>{text || 'button'}</ActionButton>
            </NavLink>
        </Section>
    );
}

export default HorizontalMenuButton;