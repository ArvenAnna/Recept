import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {NoImgIcon} from "../styled/icons.jsx";

const Receipt = styled.div`
    width: 100px;
    display:inline-block;
    vertical-align: top;
    margin: 5px;
    font-size: 0.8rem;
    
    a {
        text-decoration: none;
        
        img {
            width: 100px;
        }
        
        div {
            text-align: center;
            padding: 5px;
            color: ${props => props.theme.text};
            font-size: medium;
            font-weight: 600;
        }
    } 
    
    svg {
        width: 100px;
    }
}
`

const ReceptItem = ({item}) => {
    return (
        <Receipt>
            <Link to={item.to}>
                {item.imgPath
                    ? <img src={item.imgPath}/>
                    : <NoImgIcon/>}
                <div>{item.name}</div>
            </Link>
        </Receipt>
    );
}

// ReceptItem.propTypes = {
//     item: React.PropTypes.shape({
//         name: React.PropTypes.string,
//         to: React.PropTypes.string,
//         imgPath: React.PropTypes.string
//     })
// }

export default ReceptItem;