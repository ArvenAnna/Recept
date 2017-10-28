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