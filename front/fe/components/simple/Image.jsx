import React from 'react';
import styled from 'styled-components';
import {RemoveIcon} from "../styled/icons";
import PropTypes from 'prop-types';

const ImageContainer = styled.div`
        max-width: 100%;
        position: relative;
        margin: ${props => `${(parseFloat(props.theme.shadowRadius) + 2)}px`};
        box-shadow: ${props => props.theme.overlayShadow};
        
        &:hover .base_overlay {
            visibility: visible;
        }
            
        &:before {
            content: '';
            display: block;
            padding-top: 100%;
        }
        
        .base_image {
            object-fit: cover;
            height: 100%;
            width: 100%;
            position: absolute;
            top: 0;
        }
        
        .base_overlay {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            visibility: hidden;
            text-align: right;
            background-color: ${props => props.theme.overlayColor};
        }
        
        .del_icon {
            width: 1.5rem;
            height: 1.5rem;
            margin: 0.5rem;
            fill: ${props => props.theme.buttonColor};
        }
`

const Image = ({src, onRemove, className}) => <ImageContainer className={className ? className : ''}>
    <img src={src} className='base_image'/>
    <div className='base_overlay'>
        <RemoveIcon onClick={onRemove ? onRemove : () => {}} className='del_icon'/>
    </div>
</ImageContainer>

Image.propTypes = {
    src: PropTypes.string,
    onRemove: PropTypes.func
}

export default Image;

