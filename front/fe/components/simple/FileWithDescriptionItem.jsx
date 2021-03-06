import React from 'react';
import styled from 'styled-components';
import {RemoveIcon} from '../styled/icons';
import Image from './Image';
import {Overlay} from '../styled/overlay';
import PropTypes from 'prop-types';
import routes from "../../constants/Routes";

const Wrapper = styled.section`
    display: grid;
    grid-template-columns: 1fr 2fr;
    position: relative;
    box-shadow: ${props => props.theme.fieldShadow};
    margin: ${props => `${(parseFloat(props.theme.shadowRadius) + 2)}px`};
    
    &:hover .base_overlay {
           visibility: visible;
    }
`

const Text = styled.div`
    margin: 0.5rem;
`

const FileWithDescriptionItem = ({detail, removeDetail, className}) => {
    return (
        <Wrapper className={className ? className : ''}>
            {detail.filePath &&<Image src={detail.filePath.startsWith(routes.TEMP_CATALOG.slice(1)) ? detail.filePath : routes.IMAGE_CATALOG + detail.filePath} className='description_img'/>}
            <Text>{detail.description}</Text>

            {removeDetail && <Overlay className='base_overlay'>
               <RemoveIcon onClick={removeDetail} className='del_icon'/>
            </Overlay>}
        </Wrapper>
    );
}

FileWithDescriptionItem.propTypes = {
    className: PropTypes.string,
    removeDetail: PropTypes.func,
    detail: PropTypes.shape({
        filePath: PropTypes.string,
        description: PropTypes.string
    })
}

export default FileWithDescriptionItem;