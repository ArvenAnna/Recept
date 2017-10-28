import React from 'react';
import styled from 'styled-components';

const Detail = styled.div`
    margin: 5px;
    font-size: 0.8rem;
    display:inline-block;
    
    img {
        box-sizing: border-box;
        width: 600px;
    }
    
    div {
        box-sizing: border-box;
        padding: 5px;
        font-size: 1.1rem;
        text-align: center;
    }
`

const DetailItem = ({item}) => {
    return (
        <Detail>
            <img src={item.filePath}/>
            <div>{item.description}</div>
        </Detail>
    );
}

// DetailItem.propTypes = {
//     item: React.PropTypes.shape({
//         filePath: React.PropTypes.string,
//         description: React.PropTypes.string
//     })
// }

export default DetailItem;