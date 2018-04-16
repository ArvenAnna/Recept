import * as React from 'react';
import {NavLink} from 'react-router-dom';

export interface HorizontalMenuButtonProps {
    text: string;
    to: string;
    onClick: () => void;
}

const HorizontalMenuButton = ({onClick, text, to}: HorizontalMenuButtonProps) => {
    return (
            <NavLink to={to} className='nav_button' onClick={onClick}>
                {text || 'button'}
            </NavLink>
    );
}

export default HorizontalMenuButton;