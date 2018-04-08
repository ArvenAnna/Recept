import React from 'react';
import styled from 'styled-components';
import {RemoveIcon} from '../styled/icons';
import Image from './Image';
import {Overlay} from '../styled/overlay';

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
            <Image src={detail.filePath} className='description_img'/>
            <Text>{detail.description}</Text>

            <Overlay className='base_overlay'>
                {removeDetail && <RemoveIcon onClick={removeDetail} className='del_icon'/>}
            </Overlay>
        </Wrapper>
    );
}

// DetailItem.propTypes = {
//     item: React.PropTypes.shape({
//         filePath: React.PropTypes.string,
//         description: React.PropTypes.string
//     })
// }

export default FileWithDescriptionItem;