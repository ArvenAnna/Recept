import styled from 'styled-components';

export const ActionButton = styled.button`
        background-color: ${props => props.theme.button};
        box-shadow: ${props => props.theme.buttonShadow};
        margin: ${props => `${(parseFloat(props.theme.shadowRadius) + 2)}px`};
        
        &:hover {
            background-color: ${props => props.theme.border};
            cursor: pointer;
        }
`

export const SaveButton = ActionButton.extend`
    display: block;
`

// export const NavButton = styled.div`
// 	background-color: ${props => props.theme.button};
//     box-shadow: ${props => props.theme.buttonShadow};
//     margin: ${props => `${(parseFloat(props.theme.shadowRadius) + 2)}px`};
//     display: flex;
//     justify-content: center;
//
//     &:hover {
//         background-color: ${props => props.theme.border};
//         cursor: pointer;
//     }
//
//     a, a:active {
//         color: ${props => props.theme.text};
//     }
//
//     &.active {
//         background-color: ${props => props.theme.text};
//         color: ${props => props.theme.button};
//     }
// `