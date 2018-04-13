import styled from 'styled-components';

export const TextField = styled.input`
    height: ${props => props.theme.fieldHeight};
    background-color: ${props => props.theme.text};
    padding: 0 0.5rem;
    color: ${props => props.theme.button};
    box-shadow: ${props => props.theme.fieldShadow};
    margin: ${props => `${(parseFloat(props.theme.shadowRadius) + 2)}px`};
`

export const Text = styled.textarea`
        box-shadow: ${props => props.theme.fieldShadow};
        margin: ${props => `${(parseFloat(props.theme.shadowRadius) + 2)}px`};
        background-color: ${props => props.theme.text};
        color: ${props => props.theme.button};
        padding: 0.5rem;
        resize: none;
        overflow: hidden;
`

export const Dropdown = styled.button`
        box-shadow: ${props => props.theme.fieldShadow};
        margin: ${props => `${(parseFloat(props.theme.shadowRadius) + 2)}px`};
        background-color: ${props => props.theme.text};
        color: ${props => props.theme.button};
        padding: 0 0.5rem;
        height: ${props => props.theme.fieldHeight};
        cursor: pointer;
`

export const DropdownList = styled.div`
    margin: ${props => `${(parseFloat(props.theme.shadowRadius) + 2)}px`};
    padding: 0 0.5rem;
    cursor: pointer;
    box-shadow: ${props => props.theme.fieldShadow};
    position: absolute;
    font-size: ${props => props.theme.fieldFontSize};
    background-color: ${props => props.theme.content};
`

