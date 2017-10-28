import styled from 'styled-components';

export const ActionButton = styled.button`
        background-color: ${props => props.theme.button};
        border: none;
        outline: none;
        box-shadow: 0px 0px 3px 3px ${props => props.theme.shadow};
        
        &:hover {
            background-color: ${props => props.theme.border};
            cursor: pointer;
        }
`

export const HeaderButton = ActionButton.extend`
        width: 100%;
`