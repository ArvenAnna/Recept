import styled from 'styled-components';

export const Overlay =  styled.div`
     position: absolute;
     width: 100%;
     height: 100%;
     top: 0;
     visibility: hidden;
     text-align: right;
     background-color: ${props => props.theme.overlayColor};
     
     .del_icon {
            width: 1.5rem;
            height: 1.5rem;
            margin: 0.5rem;
            fill: ${props => props.theme.buttonColor};
     }
`