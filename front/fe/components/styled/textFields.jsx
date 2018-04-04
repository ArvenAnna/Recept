import styled from 'styled-components';

export const TextField = styled.input`
    height: ${props => props.theme.fieldHeight};
    background-color: ${props => props.theme.text};
    padding-left: 0.5rem;
    color: ${props => props.theme.button};
    box-shadow: ${props => props.theme.fieldShadow};
    margin: ${props => `${(parseFloat(props.theme.shadowRadius) + 2)}px`}
`

export const Text = styled.textarea`
        box-shadow: ${props => props.theme.fieldShadow};
        background-color: ${props => props.theme.text};
        color: ${props => props.theme.button};
        padding: 0.5rem;
        font-size: 1.3rem;
        resize: none;
`

export const SmallText = Text.extend`
        min-width: 0;
        min-height: 0;
        height: 3rem;
        font-size: 1rem;
`

