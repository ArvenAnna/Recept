import React from 'react';
import styled from 'styled-components';
import {RemoveIcon} from '../styled/icons';
import Image from './Image';

const Wrapper = styled.section`
    display: grid;
    grid-template-columns: 1fr 1fr;
    
   
    
`

const FileWithDescription = ({detail, removeDetail}) => {
    return (
        <Wrapper>
            <Image src={detail.filePath} className='description_img'/>
            <div>
                <div>{detail.description}</div>
                {removeDetail && <RemoveIcon onClick={() => removeDetail(detail)} />}
            </div>
        </Wrapper>
    );
}

// DetailItem.propTypes = {
//     item: React.PropTypes.shape({
//         filePath: React.PropTypes.string,
//         description: React.PropTypes.string
//     })
// }

export default FileWithDescription;