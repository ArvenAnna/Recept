import styled from 'styled-components';

export const TextField = styled.input`
    margin: 0 5px 0 0;
    height: 1.3rem;
    background-color: ${props => props.theme.text};
    padding-left: 3px;
    color: ${props => props.theme.button};
    display: inline-block;
    vertical-align: middle;
`

export const Text = styled.textarea`
        margin: 5px 5px 5px 0;
        margin: 0 5px 0 0;
        background-color: ${props => props.theme.text};
        color: ${props => props.theme.button};
        padding-left: 3px;
        display: inline-block;
        vertical-align: top;
        min-width: 400px;
        min-height: 15rem;
        font-size: 1.3rem;
`

export const SmallText = Text.extend`
        min-width: 0;
        min-height: 0;
        height: 3rem;
        font-size: 1rem;
`

