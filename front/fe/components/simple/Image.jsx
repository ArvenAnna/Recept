import React from 'react';
import styled from 'styled-components';
import {RemoveIcon} from "../styled/icons";
import PropTypes from 'prop-types';
import {Overlay} from '../styled/overlay';

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
`

const Image = ({src, onRemove, className}) => <ImageContainer className={className ? className : ''}>
    <img src={src} className='base_image'/>
    {onRemove && <Overlay className='base_overlay'>
        <RemoveIcon onClick={onRemove} className='del_icon'/>
    </Overlay>}
</ImageContainer>

Image.propTypes = {
    src: PropTypes.string,
    onRemove: PropTypes.func
}

export default Image;

